import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap";
import thumbnail from "../img/glitch.png";
import background from "../img/background-carousel.jpg";
export default function Mobil() {
  if (!localStorage.getItem("token-rental")) {
    window.location.href = "/login";
  }

  let [mobil, setMobil] = useState([]);
  let [idMobil, setIdMobil] = useState(0);
  let [noMobil, setNoMobil] = useState("");
  let [merk, setMerk] = useState("");
  let [jenis, setJenis] = useState("");
  let [warna, setWarna] = useState("");
  let [tahun, setTahun] = useState(0);
  let [biaya, setBiaya] = useState(0);
  let [image, setImage] = useState(null);
  let [action, setAction] = useState("");

  let [message, setMessage] = useState("");
  let [modal, setModal] = useState(null);
  let [uploadImage, setUploadImage] = useState(true);

  /** prepare token */
  let token = localStorage.getItem(`token-rental`);
  let authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let getData = () => {
    let endpoint = `http://localhost:8080/mobil`;
    /** send data */
    axios
      .get(endpoint, authorization)
      .then((response) => {
        /** simpan ke state mobil */
        setMobil(response.data);
      })
      .catch((error) => console.log(error));
  };

  // function Toast
  let showToast = (message) => {
    let myToast = new Toast(document.getElementById(`myToast`), {
      autohide: true,
    });
    //mengisi message
    setMessage(message);

    //tampilkan
    myToast.show();
  };

  let addMobil = () => {};

  let editMobil = (item) => {
    // display modal
    modal.show();

    // isi form sesuai data yg dipilih
    setIdMobil(item.id_mobil);
    setNoMobil(item.nomor_mobil);
    setMerk(item.merk);
    setJenis(item.jenis);
    setWarna(item.warna);
    setTahun(item.tahun_pembuatan);
    setBiaya(item.biaya_sewa_per_hari);
    setImage(null);
    setAction(`edit`);
    setUploadImage(false);
  };

  let hapusMobil = (item) => {
    if (
      window.confirm(`Data mobil yang telah dihapus tidak dapat dikembalikan`)
    ) {
      let endpoint = `http://localhost:8080/mobil/${item.id_mobil}`;

      /** send data untuk menghapus */
      axios
        .delete(endpoint, authorization)
        .then((response) => {
          showToast(response.data.message);
          /** refresh data pelanggaran */
          getData();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      {/** Compnent Toast */}
      <div className="position-fixed top-5 end-0 p-3" style={{ zIndex: 11 }}>
        <div className="toast bg-light" id="myToast">
          <div className="toast-header bg-info text-white">
            <strong>Message</strong>
          </div>
          <div className="toast-body">{message}</div>
        </div>
      </div>
      {/** Compnent Toast */}
      {/** Start Carousel */}
      <div className="row justify-content-center">
        <div
          className="row justify-content-center"
          style={{ backgroundImage: `url(${background})`, width: "100%" }}
        >
          <div className="card col-5">
            <div
              id="carouselExampleControls"
              className="carousel slide "
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div class="carousel-item active">
                  <img src={thumbnail} class="d-block w-100" alt="..." />
                  <div class="ms-3 d-none d-md-block text-dark my-3">
                    <h5>Malang, Jawa Timur</h5>
                  </div>
                </div>
                {mobil.map((item) => (
                  <div className="carousel-item" key={`key-${item.id_mobil}`}>
                    <img
                      src={`http://localhost:8080/image/${item.image}`}
                      className="d-block w-100"
                      alt="..."
                    />
                    <div class="text-center d-none d-md-block text-dark my-3">
                      <h5>
                        <strong>{item.merk}</strong> ({item.jenis})
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
              {/** Button next & prev */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/** End Carousel */}
      <div className="card my-3">
        <div className="card-header bg-dark text-white">
          <h4>List Mobil</h4>
        </div>
        <div className="card-body">
          <div className="list-group">
            {mobil.map((item) => (
              <li className="list-group-item" key={`key-${item.id_mobil}`}>
                <div className="row">
                  {/** Section gambar */}
                  <div className="col-3">
                    <img
                      src={`http://localhost:8080/image/${item.image}`}
                      alt=""
                      style={{ width: `100%` }}
                    />
                  </div>
                  {/** section desc 1 */}
                  <div className="col-2 pt-4">
                    <h5>
                      <strong>{item.merk}</strong>
                    </h5>
                    <h6>Nopol: {item.nomor_mobil} </h6>
                    <h6>Jenis: {item.jenis} </h6>
                    <h6>Warna: {item.warna} </h6>
                  </div>
                  {/** section deesc 2 */}
                  <div className="col-2 pt-4">
                    <h5>
                      <strong> </strong>
                    </h5>{" "}
                    <br />
                    <h6>Tahun Pembuatan: {item.tahun_pembuatan} </h6>
                    <h6>Biaya Sewa: Rp{item.biaya_sewa_per_hari}/hari </h6>
                  </div>
                  {/** section tombol */}
                  <div className="col-5 py-5 pe-5 row justify-content-end">
                    <button
                      className="col-6 btn btn-sm btn-outline-primary my-1 ms-2"
                      onClick={() => editMobil(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="col-6 btn btn-sm btn-danger my-1 ms-2"
                      onClick={() => hapusMobil(item)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
        <div className="card-bottom row justify-content-center mx-3">
          <button className="btn btn-success mb-3" onClick={() => addMobil()}>
            Tambahkan Mobil
          </button>
        </div>
      </div>
    </div>
  );
}


