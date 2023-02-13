import React, { useState, useRef } from "react";
import ndclogo from "../images/ndc-logo.png";
import uenrlogo from "../images/uenr-logo.png";
import FormInput from "../components/FormInput";
import CardEntry from "../components/CardEntry";
import axios from "axios";
import passportPic from "../images/imageplch.jpg";
import exportAsImage from "../utils/ExportAsImage";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
function CardForm() {
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [constituency, setConstituency] = useState("");
  const [contact, setContact] = useState("");
  const [dateJoined, setDateJoined] = useState("");
  const [passportSrc, setPassportSrc] = useState("");
  const [preview, setPreview] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    status: false,
    message: "",
  });
  const [isClicked, setIsClicked] = useState(false);
  console.log(isClicked);
  const [registeredPerson, setRegisteredPerson] = useState({});
  const exportRef = useRef();

  function submitForm(event) {
    setPreview(true);
    setIsClicked(true);
    event.preventDefault();

    const registered = {
      fullName: name,
      program: program,
      level: level,
      constituency: constituency,
      phone: contact,
      dateOfJoining: dateJoined,
      passportPhoto: passportSrc,
    };

    axios
      .post("https://tein-uenr-api.onrender.com/register", registered)
      .then((res) => {
        console.log(res.data);
        setErrorStatus({ status: false, message: "" });
        setRegisteredPerson(res.data);
      })

      .catch((err) => {
        console.log(err);
        setErrorStatus({
          status: true,
          message: err.message,
        });
      });
  }

  return (
    <div className="App">
      <div className="main">
        <div className="left-container">
          <form action="" onSubmit={submitForm}>
            <FormInput
              label="Full name"
              placeholder="Please enter your full name"
              id="name"
              name="name"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
            <FormInput
              label="Program"
              placeholder="Please enter your program of study"
              id="program"
              name="program"
              value={program}
              onChange={(event) => setProgram(event.target.value)}
            />

            <FormInput
              label="Level"
              placeholder="Please enter your level"
              id="level"
              name="level"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            />

            <FormInput
              label="constituency"
              placeholder="Please enter your constituency"
              id="constituency"
              name="constituency"
              value={constituency}
              onChange={(event) => setConstituency(event.target.value)}
            />

            <FormInput
              label="Phone number"
              placeholder="Please enter phone number"
              id="contact"
              type="tel"
              name="phone"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
            />

            <FormInput
              label="Date joined"
              placeholder="Please enter phone date"
              id="date"
              type="date"
              pattern="\d{4}-\d{2}-\d{2}"
              name="date_of_joining"
              value={dateJoined}
              onChange={(event) => setDateJoined(event.target.value)}
            />

            <FormInput
              label="Upload passport photo(png or jpg is preferred)"
              type="file"
              accept="image/*"
              id="file"
              onChange={(event) => {
                setPassportSrc(URL.createObjectURL(event.target.files[0]));
              }}
            />

            <div className="buttons-row">
              <button
                className="button preview-btn"
                id="preview-btn"
                type="submit"
              >
                Preview card
              </button>
              <button
                className="button new-button"
                onClick={() => {
                  setName("");
                  setProgram("");
                  setLevel("");
                  setConstituency("");
                  setContact("");
                  setDateJoined("");
                  setPassportSrc("");
                  setPreview(false);
                  setIsClicked(false);
                }}
              >
                Add new
              </button>
            </div>
            <div
              className="alert"
              style={{ display: isClicked === true ? "block" : "none" }}
            >
              {!errorStatus.status ? (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Registration successful
                </Alert>
              ) : (
                <Alert severity="error">
                  <AlertTitle>{errorStatus.message}</AlertTitle>
                  Registration unsuccessful.
                </Alert>
              )}
            </div>
          </form>
        </div>
        <div className="right-container">
          <div ref={exportRef} className="id-card">
            <div className="card-row1">
              <img src={ndclogo} className="id-card-logo" alt="" />
              <h3>TERTIARY EDUCATION INSTITUTIONS NETWORK</h3>
              <img src={uenrlogo} className="id-card-logo" alt="" />
            </div>

            <div className="card-row2">
              <h5>TEIN-UENR MEMBERSHIP CARD</h5>
              <hr />
            </div>

            <div className="card-row3">
              <div className="person-details">
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Full Name"
                  response={name}
                />
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Program"
                  response={program}
                />
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Level"
                  response={level}
                />
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Membership Number"
                  response={registeredPerson.membershipNumber}
                />
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Constituency"
                  response={constituency}
                />
                <CardEntry
                  style={{ display: !preview ? "none" : null }}
                  query="Date Of Joining"
                  response={dateJoined}
                />
              </div>
              <div className="passport-photo">
                <img src= {passportPic}  alt="" />
              </div>
            </div>
          </div>
          <button
            className="button download-btn"
            onClick={() => exportAsImage(exportRef.current, name)}
          >
            Download
          </button>

          <button
            className="button todb-btn"
            onClick={() => window.open("/registered-members", "_blank")}
          >
            View Members
          </button>
        </div>
      </div>
      {/* <div
        className="progress-container"
        style={{ display: isClicked ? "block" : "none" }}
      >
         <CircularProgress /> 
      </div> */}
    </div>
  );
}

export default CardForm;
