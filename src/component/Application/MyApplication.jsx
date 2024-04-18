import React, { useContext, useEffect, useState } from "react";
import { BiCheckCircle, BiXCircle, BiCalendarPlus } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Context } from "../../ContexApi/CreateApi";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(`http://localhost:4000/api/v1/application/employer/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(`http://localhost:4000/api/v1/application/jobseeker/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="container-fluid">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container ">
          <h1 className="mb-4">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="mb-4">
      <div className="border border-2 p-3 d-md-flex justify-content-between align-items-center">
        <div className="mb-3">
          <div className="mb-3">
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bold mb-2">
                  <i className="bi bi-person-fill me-1"></i>
                  Name:
                </p>
                <p className="fs-5">{element.name}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-2">
                  <i className="bi bi-envelope-fill me-1"></i>
                  Email:
                </p>
                <p className="fs-5">{element.email}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bold mb-2">
                  <i className="bi bi-telephone-fill me-1"></i>
                  Phone:
                </p>
                <p className="fs-5">{element.phone}</p>
              </div>
              <div className="col-md-6">
                <p className="fw-bold mb-2">
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  Address:
                </p>
                <p className="fs-5">{element.address}</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="fw-bold mb-2">
                  <i className="bi bi-file-earmark-text-fill me-1"></i>Cover
                  Letter:
                </p>
                <p className="fs-5">{element.coverLetter}</p>
              </div>
            </div>
          </div>

          <div className="w-100 text-center d-flex justify-content-between align-items-center">
            {element.status === "Pending" && (
              <div className="alert alert-warning mb-2" role="alert">
                Status: {element.status}
                <i className="bi bi-clock-fill text-warning ms-2"></i>
              </div>
            )}
            {element.status === "Rejected" && (
              <div className="alert alert-danger mb-2" role="alert">
                Status: {element.status}
                <i className="bi bi-x-circle-fill text-danger ms-2"></i>
              </div>
            )}
            {element.status === "Accepted" && (
              <div className="alert alert-success mb-2" role="alert">
                Status: {element.status}
                <i className="bi bi-check2-circle text-success ms-2"></i>
              </div>
            )}
            <button
              onClick={() => deleteApplication(element._id)}
              className="btn btn-danger  "
            >
              <i class="bi bi-trash circle  me-2  "></i>
              Delete Application
            </button>
          </div>
        </div>

        <div className="d-none d-lg-block">
          <img
            src={element.resume.url}
            className="img-fluid w-25"
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>

        <div className="d-flex justify-content-center align-items-center">
          {element.status === "Accepted" && (
            <Link to={`schedule/${element._id}`} className="btn btn-primary">
              <i className="bi bi-calendar-check-fill me-2"></i>Interview
              Scheduled. Check here
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const [status, setStatus] = useState(element.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/application/update/${element._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                {/* Render other details */}
                <p className="card-text">
                  <span className="fw-bold">Name:</span> {element.name}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Email:</span> {element.email}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Phone:</span> {element.phone}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Address:</span> {element.address}
                </p>
                <p className="card-text">
                  <span className="fw-bold">CoverLetter:</span>{" "}
                  {element.coverLetter}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Status:</span> {status}
                </p>
                <div className="card-body d-flex justify-content-between">
                  {/* Add UI element for status update */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate("Accepted")}
                    disabled={status === "Accepted"} // Disable if already accepted
                  >
                    {" "}
                    <BiCheckCircle size={18} className="me-2" />
                    Accept
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleStatusUpdate("Rejected")}
                    disabled={status === "Rejected"} // Disable if already rejected
                  >
                    {" "}
                    <BiXCircle size={18} className="me-2" />
                    Reject
                  </button>
                  <div>
                    {" "}
                    <Link
                      className="btn btn-secondary "
                      to={`/interview/${element._id}`}
                    >
                      <BiCalendarPlus size={18} className="me-2" />{" "}
                      {/* Icon for Schedule the interview */}
                      Schedule the interview
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-none d-md-block border-2 border h-100 ">
              <img
                src={element.resume.url}
                className="img-fluid w-25 w-50 h-50 m-5"
                alt="resume"
                onClick={() => openModal(element.resume.url)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
