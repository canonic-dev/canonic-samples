import React from "react";

import InputWithButton from "../../../../components/InputWithButton";

import "./Toolkit.css";

function Toolkit({
  active,
  inputText,
  sessionId,
  handleNameChange,
  onNameSave,
  onNewSession,
}) {
  return (
    <div className="toolkit">
      <div className="toolkit-wrapper">
        <InputWithButton
          active={active}
          label="nickname"
          placeholder="Enter your nickname"
          inputText={inputText}
          buttonText="save"
          onHandleChange={handleNameChange}
          onClick={onNameSave}
        />
        <div className="toolkit-session">
          <div className="toolkit-session-id">
            ID: <span>{sessionId}</span>
          </div>
          <div className="button" onClick={onNewSession}>
            create/join session
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolkit;
