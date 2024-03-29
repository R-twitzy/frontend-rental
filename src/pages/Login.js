import { useState } from "react";
import axios from "axios";
import background from "../img/background-login.jpeg"

export default function Login() {
  //ss
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")

  let loginProcess = ev => {
    ev.preventDefault()
    //akses ke backend utk proses login
    // method POST
    // endpoint http://localhost:8080/user/auth
    // request: username dan password
    // response logged and token
    let request = {
      username: username,
      password: password
    }
    let endpoint = `http://localhost:8080/karyawan/auth`

    //sending data
    axios.post(endpoint, request)
      .then(response => {
        if (response.data.logged === true) {
          let token = response.data.token
          //store token to local storage browser
          localStorage.setItem(`token-rental`, token)
          let dataKaryawan = JSON.stringify(response.data.dataKaryawan)
          localStorage.setItem(`karyawan-rental`, dataKaryawan)
          alert(`Login Berhhasil`)
          window.location.href = "/"
        } else {
          alert(`invalid username or password`)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <div style={{ backgroundImage: `url(${background})`, height: '100vh', width: '100%' }} className="fixed-top">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="card mt-5 col-12 col-md-9 col-lg-7 col-xl-6" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
            {/* White Container */}
            {/* Main Heading */}
            <div className="card-header row justify-content-center align-items-center bg-dark text-white">
              <h1><strong>Login</strong></h1>
            </div>
            <div className="card-body pt-3 pb-3">
              <form onSubmit={ev => loginProcess(ev)}>
                {/* User Name Input */}
                <div className="form-group row justify-content-center px-3 my-2">
                  <h6>Username</h6>
                  <input type="text" placeholder="username" className="form-control" required
                    value={username} onChange={(ev) => setUsername(ev.target.value)} />
                </div>
                {/* Password Input */}
                <div className="form-group row justify-content-center px-3 my-2">
                  <h6>Password</h6>
                  <input type="password" placeholder="●●●●●●●●" className="form-control" required
                    value={password} onChange={(ev) => setPassword(ev.target.value)} />
                </div>
                {/* Log in Button */}
                <div className="row justify-content-center">
                  <button type="submit" className="col-8 btn btn-success mt-3 mb-2">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h6 className='text-secondary text-center fixed-bottom mb-4'>
        <strong>Created by Walyul'ahdi Maulana Ramadhan in 2022</strong>
      </h6>
    </div>
  )
}