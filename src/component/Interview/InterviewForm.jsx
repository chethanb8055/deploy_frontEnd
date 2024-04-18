import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../ContexApi/CreateApi";

const InterviewForm = () => {
  const { id } = useParams();

  const { isAuthorized, user } = useContext(Context);

  const [formData, setFormData] = useState({
    date: new Date(),
    time: "",
    location: "",
    interviewType: "In-person",
    meetingLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/interviews/schedule/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Interview scheduled successfully:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error scheduling interview:", error.response.data.message);
    }
  };
  if (user && user.role === "Job Seeker") {
    console.log("Not ALlowed");
  }

  return (
    <div className="container">
      <h1>Schedule Interview</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <br />
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            className="form-control"
            name="date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            type="text"
            className="form-control"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="interviewType" className="form-label">
            Interview Type
          </label>
          <select
            className="form-select"
            id="interviewType"
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
          >
            <option value="In-person">In-person</option>
            <option value="Phone">Phone</option>
            <option value="Video">Video</option>
          </select>
        </div>
        {formData.interviewType == "Video" && (
          <div className="mb-3">
            <label htmlFor="meetingLink" className="form-label">
              Meeting Link
            </label>
            <input
              type="text"
              className="form-control"
              id="meetingLink"
              name="meetingLink"
              value={formData.meetingLink}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.interviewType == "In-person" && (
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
