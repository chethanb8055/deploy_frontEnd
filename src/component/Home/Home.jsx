import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../ContexApi/CreateApi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        console.log(response.data);
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(()=>{

  },[filteredJobs, handleSearch])

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-evenly align-items-center my-4">
        <h1>ALL AVAILABLE JOBS</h1>
        <input
          type="text"
          placeholder="Search by title, category, or country..."
          value={searchQuery}
          onChange={handleSearch}
          className="form-control w-50"
        />
      </div>
      <div className="row justify-content-evenly">
        {filteredJobs.map((element) => (
          <div
            className="card col-sm-10 col-md-5 col-lg-3 mx-1 my-4 shadow"
            key={element._id}
          >
            <div className="card-body">
              <h5 className="card-title">{element.title}</h5>
              <p className="card-text">
                <strong>Category:</strong> {element.category}
              </p>
              <p className="card-text">
                <strong>Country:</strong> {element.country}
              </p>
              <Link to={`/job/${element._id}`} className="btn btn-primary">
                <i className="bi bi-info-circle-fill me-1"></i>
                Job Details
              </Link>
              <p className="text-secondary mt-2 fs-6">
                <i className="bi bi-clock-history-fill me-1"></i>
                {moment(element.jobPostedOn).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
