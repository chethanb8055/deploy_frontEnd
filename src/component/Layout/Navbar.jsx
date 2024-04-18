import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../ContexApi/CreateApi";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  // console.log(user);

useEffect(()=>{
  
},[user])

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      setIsAuthorized(false);
      setUser("");
      navigateTo("/login");
      toast.success(response.data.message);
    } catch (error) {
      setUser("")
      toast.error(error.response.data.message), setIsAuthorized(true);
      Navigator("/login")
      navigateTo("/login");
    }
  };


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={"/applications/me"}>
                {user && user.role === "Employer" ? (
                  <>
                    <i className="bi-file-earmark-text-fill me-2"></i>{" "}
                    {/* Bootstrap icon for employer */}
                    APPLICANT'S APPLICATIONS
                  </>
                ) : (
                  <>
                    {/* Bootstrap icon for applicant */}
                    <i className="bi-file-earmark-text-fill"></i> MY
                    APPLICATIONS
                  </>
                )}
              </Link>
            </li>

            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/post"}
                    onClick={() => setShow(false)}
                  >
                    <i className="bi bi-journal-plus-fill me-2"></i>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/me"}
                    onClick={() => setShow(false)}
                  >
                    {" "}
                    <i className="bi bi-briefcase-fill me-2"></i>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"applications/me"}
                >
                  <i className="bi bi-person-check-fill me-2"></i>
                  My Application
                </Link>
              </li>
            )}
            {user && Object.keys(user).length === 0 || user === "" ? (
              <li>
                <Link to="/login" className="btn btn-primary">
                  <i className="bi bi-door-open-fill me-2"></i>{" "}
                  {/* Bootstrap icon for login */}
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button className="btn btn-primary" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
