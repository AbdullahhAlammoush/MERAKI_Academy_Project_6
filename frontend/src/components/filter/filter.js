import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Row, Col } from "react-bootstrap";
import "../filter/filter.css";

// -------------------------------------------------------------------------------
// const [tripsShower, settripsShower] = useState([]);
const Filter = () => {
  const [filterTrips, setfilterTrips] = useState([]);
  const [TRIPfrom, setTRIPfrom] = useState("");
  const [TRIPto, setTRIPto] = useState("");
  // const [seats, setSeats] = useState(0);
  // const [tripId, setTripId] = useState(0);

  const filteredTrips = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:5000/filter", {
        TRIPfrom,
        TRIPto,
      });
      console.log(result.data);

      if (result.data.success) {
        setfilterTrips(result.data.result);
        // setTripId(result.data.result.id);
      } else throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  const riderId = localStorage.getItem("User");
  // const tripId = localStorage.setItem("tripId", tripId);

  const sendJoinRequest = (tripId) => {
    console.log("it is working");
    axios
      .post(`http://localhost:5000/join/${tripId}`, {
        riderId,
      })
      .then((result) => {
        console.log(result);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
      })
      .catch((err) => {
        console.log(err);
        console.log("nononononononononono");
      });
  };

  const update = (id, seats) => {
    seats += 1;
    axios
      .put(`http://localhost:5000/join/update/${id}`, {
        seats,
      })
      .then((result) => {
        console.log(result);
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        filteredTrips();
      })
      .catch((err) => {
        console.log(err);
        console.log("nononononononononono");
      });
  };
  // const seatsNumber = (id, seat) => {
  //   setSeats(seat + 1);
  //   console.log(seat);
  //   update(id);
  // };
  const inc = () => {};
  return (
    <>
    <div id="paragraphfilter">
    <h5>Please add location you want a ride from, and destination you are going to, in the inputs below and click search.</h5>
    <br/>
    <h5>All trips that match your search will appear, choose the one you prefer to book with.</h5>
    </div>
      <form onSubmit={filteredTrips}>
        <br />
        <label for="inputEmail3" class="col-sm-2 col-form-label">
          Pick up location
        </label>
        <input
          type="text"
          placeholder="Please type it here"
          className="form-control"
          id="formGroupExampleInput"
          onChange={(e) => setTRIPfrom(e.target.value)}
        />
        <br />
        <label for="inputEmail3" class="col-sm-2 col-form-label">
          Destination to
        </label>
        <input
          type="text"
          placeholder="Please type it here"
          className="form-control"
          id="formGroupExampleInput"
          onChange={(e) => setTRIPto(e.target.value)}
        ></input>
        <br />
        <Button type="submit">Search</Button>
      </form>

      <div className="gridcontainer">
        {filterTrips.map((elem, index) => {
          return (
            <div key={index}>
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>
                  <p> Going to: {elem.TRIPto}  </p>
                  <p>From: {elem.TRIPfrom}</p>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    <p> Start Point: {elem.TRIPfrom}</p>
                  </Card.Title>
                  <Card.Text>
                    <p>Number of seats: {elem.numberOfSeats}</p>
                    <p>Number of passengers: {elem.passengers}</p>

                    <p>Charge per passenger: {elem.Price} JD</p>

                    <p>Date of trip: {elem.Datetrip} </p>
                    <p>Time of trip: {elem.Timetrip} </p>

                  </Card.Text>
                </Card.Body>
                <button
                  onClick={() => {
                    sendJoinRequest(elem.id);
                    // seatsNumber(elem.id, elem.numbersite);
                    // setSeats(elem.numbersite + 1);
                    update(elem.id, elem.numbersite);
                    // filteredTrips();
                  }}
                >
                  join trip
                </button>
              </Card>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
