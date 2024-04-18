import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div
      className="resume-modal w-50 mx-auto position-absolute"
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
    >
      <div className="modal-content">
        <span className="close h2 w-25" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" className=" img-fluid" />
      </div>
    </div>
  );
};

export default ResumeModal;
