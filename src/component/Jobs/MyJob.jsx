import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../ContexApi/CreateApi";

const MyJob = () => {
  const [myJobs, setMyJobs] = useState([]);
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (user && user.role !== "Employer") {
    return navigateTo("/");
  }

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Your Posted Jobs</h1>
          {myJobs?.length > 0 ? (
            <div className="job-list">
              {myJobs.map((element) => (
                <div className="card mb-4" key={element._id}>
                  <div className="card-body">
                    <h2 className="card-title">{element.title}</h2>
                    <p className="card-text">Location: {element.location}</p>
                    <p className="card-text">Category: {element.category}</p>
                    <p className="card-text">
                      Salary:{" "}
                      {element.fixedSalary ||
                        `${element.salaryFrom} - ${element.salaryTo}`}
                    </p>
                    <p className="card-text">
                      Description: {element.description}
                    </p>
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyJob;
