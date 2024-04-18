import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../ContexApi/CreateApi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/job/getall`,
          {
            withCredentials: true,
          }
        );
        setJobs(response.data.data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);


  return (
    <div>
      <div className="container-fluid">
        <h1 className="mb-4">
          {/* Icon for "ALL AVAILABLE JOBS" */}
          ALL AVAILABLE JOBS
        </h1>
  

        <div className="">
          <div className=" row justify-content-evenly border border-2">
            {jobs.map((element) => (
              <div className="card col-3 mx-1 my-4" key={element._id}>
                <p>{element.name}</p>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
