import React from "react";

const Footer = () => {
  return (
    <footer className="bg-body-tertiary  py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <p>If you have any questions or inquiries, feel free to contact us.</p>
            <ul className="list-unstyled">
              <li>Email: example@example.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Follow Us</h5>
            <p>Stay connected with us on social media for updates and news.</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#"><i className="bi bi-facebook"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-twitter"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-instagram"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
