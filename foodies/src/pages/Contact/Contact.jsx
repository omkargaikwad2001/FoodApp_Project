import React from 'react';
import "./contact.css";

const Contact = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="contact-form">
            <h2 className="mb-4">Contact Us</h2>
            <form action="https://formsubmit.co/omggaming2810@gmail.com" method="post">
              <div className="mb-3">
                <label htmlFor="name" className="form-label ">Your Name</label>
                <input type="text" name='name' className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input type="email" name='email' className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea className="form-control" name='message' id="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
