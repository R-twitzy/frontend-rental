import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function Mobil() {
  if (!localStorage.getItem(`token-rental`)) {
    window.location.href = `./login`;
  }
  let [mobil, setMobil] = useState([]);

  let [idMobil, setIdMobil] = useState("");
  let [nomor, setNomor] = useState("");
  let [merk, setMerk] = useState("");
  let [jenis, setJenis] = useState("");
  let [warna, setWarna] = useState("");
  let [tahun, setTahun] = useState("");
  let [biaya, setBiaya] = useState(0);
  let [gambar, setGambar] = useState(null);
  let [uploadGambar, setUploadGambar] = useState(true);

  let [action, setAction] = useState("");
  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);
  let [modal2, setModal2] = useState(null);

  let [selectedMobil, setSelectedMobil] = useState({
    nomor_mobil: null,
    merk: null,
    jenis: null,
    warna: null,
    tahun_pembuatan: null,
    biaya_sewa: null,
  });

  /** get token from local storage */
  let token = localStorage.getItem(`token-rental`);

  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getMobil = () => {
    let endpoint = `http://localhost:8000/mobil`;

    axios
      .get(endpoint, authorization)
      .then((response) => {
        setMobil(response.data.Mobil);
      })
      .catch((error) => console.log(error));
  };

  /** create function to show Toast */
  let showToast = (message) => {
    let myToast = new Toast(document.getElementById(`myToast`), {
      autohide: true,
    });
    /** perintah utk mengisi state 'message */
    setMessage(message);

    /** show Toast */
    myToast.show();
  };

  let showDetail = (item) => {
    modal2.show();

    setSelectedMobil(item);
  };

  let tambahMobil = () => {
    // display modal
    modal.show();

    // mengosongkan inputan form nya
    setIdMobil(0);
    setNomor("");
    setMerk("");
    setJenis("");
    setWarna("");
    setTahun("");
    setBiaya(0);
    setGambar(null);
    setAction("insert");
    setUploadGambar(true);
  };

  let editMobil = (item) => {
    // display modal
    modal.show();

    // isi form sesuai data yg dipilih
    setIdMobil(item.id_mobil);
    setNomor(item.nomor_mobil);
    setMerk(item.merk);
    setJenis(item.jenis);
    setWarna(item.warna);
    setTahun(item.tahun_pembuatan);
    setBiaya(item.biaya_sewa);
    setGambar(null);
    setAction(`edit`);
    setUploadGambar(false);
  };

  let hapusMobil = (item) => {
    if (window.confirm(`Are you sure want to delete this data?`)) {
      let endpoint = `http://localhost:8000/mobil/${item.id_mobil}`;

      //sending data
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          showToast(response.data.message);
          getMobil();
        })
        .catch((error) => console.log(error));
    }
  };

  let simpanMobil = (event) => {
    event.preventDefault();
    // close modal
    modal.hide();
    if (action === "insert") {
      let endpoint = `http://localhost:8000/mobil`;
      let request = new FormData();
      request.append(`nomor_mobil`, nomor);
      request.append(`merk`, merk);
      request.append(`jenis`, jenis);
      request.append(`warna`, warna);
      request.append(`tahun_pembuatan`, tahun);
      request.append(`biaya_sewa`, biaya);
      request.append(`image`, gambar);

      // send data
      axios
        .post(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getMobil();
        })
        .catch((error) => console.log(error));
    } else if (action === "edit") {
      let endpoint = `http://localhost:8000/mobil/${idMobil}`;
      let request = new FormData();
      request.append(`nomor_mobil`, nomor);
      request.append(`merk`, merk);
      request.append(`jenis`, jenis);
      request.append(`warna`, warna);
      request.append(`tahun_pembuatan`, tahun);
      request.append(`biaya_sewa`, biaya);
      if (uploadGambar === true) {
        request.append(`image`, gambar);
      }

      // sending data utk update pelanggaran
      axios
        .put(endpoint, request, authorization)
        .then((response) => {
          showToast(response.data.message);
          // refresh data pelanggaran
          getMobil();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    let myModal = new Modal(document.getElementById(`modal-mobil`));
    setModal(myModal);

    let newModal = new Modal(document.getElementById(`modal-detail`));
    setModal2(newModal);

    getMobil();
  }, []);

  return (
    <div className="container">
      {/* start component toast untuk menggantikan alert*/}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-success text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>

      {/* <div className="row card"> */}
      <div
        className="card-header rounded-3 bg-transparent"
        style={{ background: `#001845` }}
      >
        <div className="row">
          <div className="col-lg-10">
            <h2 className="text-white mx-2 my-2 p-2">
              <b>Mobil Sewa </b>
            </h2>
          </div>
          <div className="col-lg-2">
            <button
              className="btn btn-primary shadow justify-content-end mx-auto my-3 rounded-pill p-2"
              onClick={() => tambahMobil()}
            >
              <span className="fa fa-plus"></span>Tambah Mobil
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0 my-3" style={{ background: `#001845` }}>
        {mobil.map((item) => (
          <div className="col-4 ">
            <div className="card-body" style={{ background: `#001845` }}>
              <ul className="list-group  list-group-flush">
                <li
                  className="list-group-item rounded-3 d-flex justify-content-around"
                  key={`key${item.id_mobil}`}
                  style={{ background: `#002855` }}
                >
                  <div className="row align-items-center">
                    <div className="col-lg-12 mx-auto text-white">
                      <img
                        src={`http://localhost:8000/image/${item.image}`}
                        alt="Gambar Mobil"
                        className="rounded-3"
                        style={{ width: `100%` }}
                      />
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4 text-white">
                        <small className="text-light">Merk</small>
                        <h5>
                          <b>{item.merk}</b>
                        </h5>
                      </div>
                      <div className="col-lg-8 text-white">
                        <small className="text-light">Biaya Sewa</small>
                        <h5>
                          <b>Rp{item.biaya_sewa} /</b> <small> hari</small>
                        </h5>
                      </div>
                    </div>
                    <div className="col-12 mt-2">
                      <div className="row">
                        <div className="col-lg-8 d-lg-block">
                          <div className="d-grid d-block mt-2">
                            <button
                              className="btn shadow rounded-pill btn-primary btn-primary"
                              onClick={() => showDetail(item)}
                            >
                              <span className="fa fa-detail"></span> Lihat
                              Detail
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => editMobil(item)}
                          >
                            <span className="fa fa-edit"></span>
                          </button>
                          <button
                            className="btn btn-danger m-2"
                            onClick={() => hapusMobil(item)}
                          >
                            <span className="fa fa-trash"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        ))}

        <div className="modal" id="modal-mobil">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header bg-primary">
                <h4 className="text-white">Form Siswa</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={(ev) => simpanMobil(ev)}>
                  Nomor Mobil
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setNomor(e.target.value)}
                    value={nomor}
                  />
                  Merk
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setMerk(e.target.value)}
                    value={merk}
                  />
                  Jenis
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setJenis(e.target.value)}
                    value={jenis}
                  />
                  Warna
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setWarna(e.target.value)}
                    value={warna}
                  />
                  Tahun
                  <input
                    type="text"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setTahun(e.target.value)}
                    value={tahun}
                  />
                  Biaya
                  <input
                    type="number"
                    className="form-control mb-2"
                    required
                    onChange={(e) => setBiaya(e.target.value)}
                    value={biaya}
                  />
                  Gambar
                  <input
                    type="file"
                    className={`form-control mb-2 ${
                      uploadGambar ? `` : `d-none`
                    }`}
                    required={uploadGambar}
                    accept="image/*"
                    onChange={(e) => setGambar(e.target.files[0])}
                  />
                  <button
                    type="button"
                    className={`btn btn-dark btn-sm ${
                      uploadGambar ? `d-none` : ``
                    }`}
                    onClick={() => setUploadGambar(true)}
                  >
                    Click to re-upload image
                  </button>
                  <br />
                  <button type="submit" className="btn btn-outline-primary">
                    <span className="fa fa-check"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="modal text-white" id="modal-detail" tabindex="-1">
          <div className="modal-dialog">
            <div
              className="modal-content text-white"
              style={{ background: "#001845" }}
            >
              <div className="modal-header text-white">
                <h4 className="modal-title">
                  {selectedMobil.merk} - {selectedMobil.nomor_mobil}
                </h4>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-white">
                <small>Jenis</small>
                <h5>{selectedMobil.jenis}</h5>
                <br />

                <small>Warna</small>
                <h5>{selectedMobil.warna}</h5>
                <br />

                <small>Tahun</small>
                <h5>{selectedMobil.tahun_pembuatan}</h5>
                <br />

                <small>Biaya Sewa</small>
                <h5>{selectedMobil.biaya_sewa} / hari</h5>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}