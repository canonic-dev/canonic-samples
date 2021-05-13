import React from "react";

import InputWithButton from "../../components/InputWithButton";

import "./EmptySessionState.css";

function EmptySessionState({ onCreateSession, onJoinSession }) {
  const [joinSessionId, setJoinSessionId] = React.useState("");

  const onTextChange = (e) => setJoinSessionId(e.target.value);
  return (
    <div className="emptySessionState">
      <div className="emptySessionState-info">
        <div className="emptySessionState-info-heading">
          Planning made <span>EASY</span>
        </div>
        <div className="emptySessionState-info-text">
          Planning poker provides a platform for your team to join and
          accurately estimate tickets. Use for free.
        </div>
        <ul className="emptySessionState-info-list">
          To use sprint planning poker either:
          <li>Create a new session by clicking on the right side button</li>
          <li>OR enter your team's session ID</li>
        </ul>
        <div className="emptySessionState-info-list">
          If you create a new session, you can <b>share the session id</b> with
          rest of the team to join.
        </div>
        <div className="emptySessionState-info-more">
          <a
            href="https://www.atlassian.com/agile/project-management/estimation"
            target="_blank"
            rel="noreferrer"
          >
            Learn more
          </a>{" "}
          about planning and story points.
        </div>
        <div className="emptySessionState-info-powered">
          <a href="https://canonic.dev" target="_blank" rel="noreferrer">
            powered by <span>Canonic</span>
          </a>
        </div>
      </div>
      <div className="emptySessionState-cta">
        <div className="emptySessionState-intro">to begin sprint poker</div>
        <div className="button" onClick={onCreateSession}>
          create a new session
        </div>
        <div className="emptySessionState-seperation">or</div>
        <InputWithButton
          buttonText="join a session"
          placeholder="enter session id"
          inputText={joinSessionId}
          onHandleChange={onTextChange}
          onClick={() => onJoinSession(joinSessionId)}
        />
      </div>
    </div>
  );
}

export default EmptySessionState;
