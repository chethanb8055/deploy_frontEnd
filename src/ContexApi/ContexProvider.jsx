import { Context } from "./CreateApi.jsx";

import React, { useState } from "react";

const ContexProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [interviewData, setInterviewData] = useState("");

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
        interviewData,
        setInterviewData,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContexProvider;
