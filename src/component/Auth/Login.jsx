import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../ContexApi/CreateApi";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Log form data whenever it changes
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    e.preventDefault();
    try {
      // Make HTTP POST request to register endpoint
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log("Registration successful:", response.data.message);
      toast.success(response.data.message);
      setIsAuthorized(true);
      setFormData({
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message);
      toast.error(error.response.data.message);
    }
    // Add your login logic here, such as making an API call to authenticate the user
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container-fluid  vh-100">
      <div className="row  border-1 border w-100 h-100 justify-content-center align-items-center  ">
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
            <div className="border border-2 ">
              <button type="submit" className="btn btn-primary w-100 p-2">
                Log in
              </button>
              <div className="mt-2">
                <span>Not registered yet?</span>
                <Link to="/register" className="text-primary ms-2 ">
                  Create an account ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
