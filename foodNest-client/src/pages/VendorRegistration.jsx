import axios from "axios";
import React, { useState } from "react";

export default function VendorRegistration() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == cPassword) {
      const vendor = {
        name,
        phone,
        title,
        email,
        password,
        cPassword,
        accountNo,
        accountName,
        bankName,
        ifsc,
        vendorName,
        vendorType,
        description,
        website,
        address,
        zip,
        city,
        state,
        country,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/api/food/vendorRegitration",
          vendor
        );
        setName("");
        setPhone("");
        setTitle("");
        setPassword("");
        setCPassword("");
        setEmail("");
        setAccountNo("");
        setAccountName("");
        setBankName("");
        setIfsc("");
        setVendorName("");
        setVendorType("");
        setDescription("");
        setWebsite("");
        setAddress("");
        setZip("");
        setCity("");
        setState("");
        setCountry("");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="row">
        <h2 className="mt-5 mx-3">Vendor Registration</h2>
        <h6 className="mt-3 mx-3 font-weight-bold">
          Vendor Registration Section
        </h6>
        <p className="mt-2 mx-3 lead">
          To register your best makes for the people of the city to relish and
          get WOWed by your gourmet makes.{" "}
        </p>
        <p className="mt-2 mx-3 lead">
          Please fill in the section to get registered
        </p>
      </div>
      <div
        className="mt-3 mx-3"
        style={{
          backgroundColor: "#eee",
          padding: "20px",
          borderRadius: "15px 15px 0 0",
          fontSize: "20px",
        }}>
        <h2>PERSONAL DETAILS</h2>
      </div>
      <form className="row g-3 m-2">
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              FullName
            </label>
            <input
              type="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Phone No.
            </label>
            <div className="flex d-flex">
              <select
                className="selectpicker countrypicker"
                data-flag="true"></select>
              <input
                type="email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="inputEmail4"
              />
            </div>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Title
            </label>
            <input
              type="email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3  ">
            <label htmlFor="inputPassword4" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              id="inputPassword4"
            />
          </div>
        </div>
        <div
          className="mt-3 mx-3"
          style={{
            backgroundColor: "#eee",
            padding: "20px",
            borderRadius: "15px 15px 0 0",
            fontSize: "20px",
          }}>
          <h2>BANKING DETAILS</h2>
        </div>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Account Name
            </label>
            <input
              type="email"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Bank Name
            </label>
            <input
              type="email"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Bank Account Number
            </label>
            <input
              type="email"
              value={accountNo}
              onChange={(e) => setAccountNo(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              IFSC Code
            </label>
            <input
              type="email"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
        </div>
        <div
          className="mt-3 mx-3"
          style={{
            backgroundColor: "#eee",
            padding: "20px",
            borderRadius: "15px 15px 0 0",
            fontSize: "20px",
          }}>
          <h2>VENDOR DETAILS</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Vendor Name
            </label>
            <input
              type="email"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Vendors Type
            </label>
            <select
              className="form-select"
              value={vendorType}
              onChange={(e) => setVendorType(e.target.value)}
              aria-label="Default select example">
              <option selected>Vendors</option>
              <option>Carriers</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="floatingTextarea2">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="floatingTextarea2"
              style={{ height: "100px" }}></textarea>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Website
            </label>
            <input
              type="email"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
            <label htmlFor="inputEmail4" className="form-label">
              Address
            </label>
            <input
              type="email"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Zipcode
            </label>
            <input
              type="email"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              City
            </label>
            <input
              type="email"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              State/Province
            </label>
            <input
              type="email"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">
              Country
            </label>
            <input
              type="email"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
              id="inputEmail4"
            />
          </div>
          <div className="mt-3">
            <div className="d-grid gap-2 col-3 mx-3 mt-3">
              <button
                className="btn btn-warning"
                onClick={handleSubmit}
                type="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
