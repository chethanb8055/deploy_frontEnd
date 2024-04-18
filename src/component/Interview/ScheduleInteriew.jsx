import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ScheduleInteriew = () => {
  const { id } = useParams();
  console.log(id);

  const [interviewInfo, setInterviewInfo] = useState("");

  const InterviewCall = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/interviews/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data.data);
      setInterviewInfo(response.data.data);
    } catch (error) {
      // Handle errors
      toast.error("Something went wrong");
      console.error("Error fetching interview:", error);
    }
  };

  useEffect(() => {
    InterviewCall();
  }, []);
  return (
    <div className="container mt-5">
      <h2>Interview Details</h2>
      <div className="card">
        <div className="card-body">
          {interviewInfo && (
            <>
              <p>
                <i className=" bi-calendar-date-fill me-2"></i>
                <strong>Date:</strong>{" "}
                {new Date(interviewInfo[0].date).toLocaleDateString()}
              </p>
              <p>
                <i className=" bi-clock-fill me-2"></i>
                <strong>Time:</strong> {interviewInfo[0].time}
              </p>
              {interviewInfo[0].location && (
                <p>
                  <i className=" bi-calendar-date-fill me-2"></i>
                  <strong>Location:</strong> {interviewInfo[0].location}
                </p>
              )}
              <p>
                <i className=" bi-person-fill me-2"></i>
                <strong>Interview Type:</strong>{" "}
                {interviewInfo[0].interviewType}
              </p>
              {interviewInfo[0].interviewType === "In-person" && (
                <p>
                  <i className=" bi-geo-alt-fill me-2"></i>
                  <strong>Location:</strong> {interviewInfo[0].location}
                </p>
              )}
              {interviewInfo[0].interviewType === "Video" && (
                <p>
                  <i className=" bi-camera-video-fill me-2"></i>
                  <i className=" bi-link-45deg me-2"></i>
                  <strong>Meeting Link:</strong> {interviewInfo[0].meetingLink}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleInteriew;
