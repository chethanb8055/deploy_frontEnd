import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../ContexApi/CreateApi";

const Signup = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Log form data whenever it changes
  useEffect(() => {
    console.log(formData.password.length);
  }, [formData]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.phone.length !== 10) {
        toast.error("Phone must contain 10 digits")
        return ;
    }

    try {
      // Make HTTP POST request to register endpoint
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      setIsAuthorized(true);
      Navigate("/");
      setFormData({
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container-fluid vh-100">
      <div className="row  w-100 h-100 justify-content-center align-items-center border-1 border mr">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                name="email"
                onChange={handleInputChange}
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                onChange={handleInputChange}
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                name="name"
                onChange={handleInputChange}
                placeholder="Your Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="inputPhone"
                name="phone"
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="inputRole"
                name="role"
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Job Seeker">Job Seeker</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
            <div className="d-flex justify-content-between align-items-baseline mt-2">
              <Link to="/login" className="text-primary me-3 ">
                alredy Registered?
              </Link>
              <button type="submit" className="btn btn-primary w-50 p-2">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
