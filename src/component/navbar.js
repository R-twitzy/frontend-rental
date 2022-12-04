import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <b className="navbar-brand" href="#">Walyul RentCar</b>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/mobil" className="nav-link active" aria-current="page">
                                    Mobil
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/mobil2" className="nav-link active" aria-current="page">
                                    mobil2
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/karyawan" className="nav-link active" aria-current="page">
                                    Karyawan
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pelanggan" className="nav-link active" aria-current="page">
                                    Pelanggan
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/sewa" className="nav-link active" aria-current="page">
                                    Sewa
                                </Link>
                            </li>
                        </ul>
                        <a className="nav-link h6">
                            <Link to="/logout" className="nav-link align-text-bottom text-danger" aria-current="page">
                                Logout
                            </Link>
                        </a>
                    </div>
                </div>
            </nav> <br /> <br/> <br />
        </div>
    )
}