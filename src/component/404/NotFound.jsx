import React from "react";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title">404 - Not Found</h1>
              <p className="card-text">
                The page you are looking for does not exist.
              </p>
              <a href="/" className="btn btn-primary">
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
