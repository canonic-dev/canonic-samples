import React from "react";

import Footer from "../Footer";
import TicketCenter from "../TicketCenter";
import Toolkit from "./components/Toolkit";

import useAllPoints from "../../hooks/useAllPoints";

import Summary from "../Summary";

import "./Dashboard.css";

function Dashboard({
  participant,
  session,
  isLatestTicket,
  createSession,
  activeTicket,
  updateTicket,
  createTicket,
  jumpToLatest,
  handleUpdateNickname,
}) {
  const [isNameEdited, setIsNameEdited] = React.useState(false);
  const [editedName, setEditedName] = React.useState("");
  const { getAllPoints } = useAllPoints();
  const [points, setPoints] = React.useState([]);

  React.useEffect(() => {
    async function allPoints() {
      const { success, points } = await getAllPoints();

      if (!success) return;

      setPoints(points);
    }

    allPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = React.useCallback((e) => {
    setIsNameEdited(true);
    setEditedName(e.target.value);
  }, []);
  return (
    <div className="dashboard">
      <Toolkit
        active={isNameEdited}
        inputText={isNameEdited ? editedName : participant.nickname}
        sessionId={session.id}
        handleNameChange={handleNameChange}
        onNameSave={() => {
          setIsNameEdited(false);
          handleUpdateNickname(editedName);
        }}
        onNewSession={createSession}
      />
      <div className="dashboard-section">
        <TicketCenter
          participantId={participant._id}
          ticket={activeTicket}
          points={points}
          updateTicket={updateTicket}
          onReveal={updateTicket("isRevealed")}
          isLatestTicket={isLatestTicket}
          jumpToLatest={jumpToLatest}
          onCreateTicket={createTicket}
        />
      </div>
      <div>
        <Summary
          participants={session.participants}
          ticket={activeTicket}
          points={points}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
