import React from "react";

import InputWithButton from "../../components/InputWithButton";
import PointSystem from "../../components/PointSystem";

import "./TicketCenter.css";

function TicketCenter({
  participantId,
  ticket = {},
  points,
  updateTicket,
  onReveal,
  isLatestTicket,
  jumpToLatest,
  onCreateTicket,
}) {
  const [hasEdited, setHasEdited] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState("");

  React.useEffect(() => {
    setEditedDescription(ticket.description);
  }, [ticket.description]);

  const handleDescriptionChange = React.useCallback((e) => {
    setHasEdited(true);
    setEditedDescription(e.target.value);
  }, []);
  const handleOnSave = React.useCallback(() => {
    updateTicket("description")(editedDescription);
    setHasEdited(false);
  }, [editedDescription, updateTicket]);
  return (
    <div className="ticketCenter">
      <div className="ticketCenter-cta">
        <div className="button" onClick={onCreateTicket}>
          create a new ticket
        </div>
        {!isLatestTicket && (
          <div className="ticketCenter-cta-latest" onClick={jumpToLatest}>
            jump to the latest ticket being discussed
          </div>
        )}
      </div>
      <div className="ticketCenter-tickets">
        <InputWithButton
          active={editedDescription && editedDescription !== ticket.description}
          label="Ticket Description"
          placeholder="Enter ticket description"
          inputText={hasEdited ? editedDescription : ticket.description}
          buttonText="Save"
          onHandleChange={handleDescriptionChange}
          onClick={handleOnSave}
        />
        <PointSystem
          selectedPoint={ticket.scoreset.find(
            (score) => score.participant === participantId
          )}
          points={points}
          onPointSelect={updateTicket("scoreset")}
          isRevealed={ticket.isRevealed}
          onRevealClick={onReveal}
        />
      </div>
    </div>
  );
}

export default TicketCenter;
