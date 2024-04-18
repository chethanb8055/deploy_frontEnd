import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../ContexApi/CreateApi";
import moment from "moment";
import toast from "react-hot-toast";

const JobDetail = () => {
  const { id } = useParams();
  // console.log(id, "isId");
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const timeAgo = moment(job.jobPostedOn).fromNow();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {

        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }
  return (
    <div>
      <section className="container-fluid">
        <div className="card p-2 mt-5 ">
          <div className="card-body shadow  ">
            <h3 className="card-title">Job Details</h3>
            <div className=" m-3">
              <p className="card-text">
                <strong>Company Name:</strong> {job.name}
              </p>
              <p className="card-text">
                <strong>Title:</strong> {job.title}
              </p>
              <p className="card-text">
                <strong>Category:</strong> {job.category}
              </p>
              <p className="card-text">
                <strong>Country:</strong> {job.country}
              </p>
              <p className="card-text">
                <strong>City:</strong> {job.city}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {job.description}
              </p>
              <p className="card-text">
                <strong>Job Posted On:</strong> {timeAgo}
              </p>
              <p className="card-text">
                <strong>Salary:</strong>{" "}
                {job.fixedSalary ? (
                  <span>{job.fixedSalary}</span>
                ) : (
                  <span>
                    {job.salaryFrom} - {job.salaryTo}
                  </span>
                )}
              </p>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link
                  to={`/application/${job._id}`}
                  className="btn btn-primary"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
