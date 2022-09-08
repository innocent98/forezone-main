import "./contact.css";
import { useState } from "react";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    success &&
      alert("Thanks for contacting us! We will get back to you shourtly");
    setValue(e.target.value);
  };
  return (
    <div className="contactPage" id="contact">
      {" "}
      <div className="container">
        <h3>Contact Us</h3>
        <form className="row g-3 contact-form" onSubmit={handleSubmit}>
          <div className="col-md-4 col-contact">
            <input
              type="email"
              placeholder="Email"
              className="form-control shadow-none"
              required
              defaultValue={value}
            />
          </div>
          <div className="col-md-4 col-contact">
            <input
              type="text"
              placeholder="Subject"
              className="form-control shadow-none"
              required
              defaultValue={value}
            />
          </div>
          <div className="col-md-4 col-contact">
            <textarea
              className="form-control shadow-none"
              name=""
              id=""
              cols="20"
              rows="5"
              placeholder="Text"
              required
              defaultValue={value}
            ></textarea>
          </div>
          <div className="col-md-4 col-contact">
            <button className="btn btn-primary submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
