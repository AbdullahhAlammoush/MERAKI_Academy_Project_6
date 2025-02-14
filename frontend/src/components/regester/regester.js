import React, { useContext, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";
//=====================================================
const Register = () => {
  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [Username, setUsername] = useState("");

  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const role_id = "1";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        Username,
        email,
        Password,
      });
      console.log(result);
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  // =================================================================
  // =================================================================

  return (
    <>
      <div class="container h-100">
        <div class="row h-100">
          <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
            <div class="d-table-cell align-middle">
              <div class="text-center mt-4">
                <h1 class="h2">Get started</h1>
                <p class="lead">
                  Start creating the best possible user experience for you
                  customers.
                </p>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="m-sm-4">
                    <form onSubmit={addNewUser}>
                      <div class="form-group">
                        <label>Name</label>
                        <input
                          class="form-control form-control-lg"
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div class="form-group">
                        <label>Email</label>
                        <input
                          class="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div class="form-group">
                        <label>Password</label>
                        <input
                          class="form-control form-control-lg"
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          placeholder="Enter password"
                        />
                      </div>
                      <div class="text-center mt-3">
                        <button type="submit" class="btn btn-lg btn-primary">
                          Sign up
                        </button>
                        <br />
                        <a href="/login">login</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
