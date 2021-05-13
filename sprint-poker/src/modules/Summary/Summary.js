import React from "react";

import "./Summary.css";

function Summary({ participants, ticket, points }) {
  const votesDistribution = points
    .map((point) => ({
      point: point.label,
      votes: ticket.isRevealed
        ? ticket.scoreset.filter((score) => score.points === point._id).length
        : 0,
    }))
    .sort((a, b) => a - b);

  return (
    <div className="summary">
      <div className="summary-heading">summary</div>
      <div className="summary-brief">
        <div className="summary-brief-column summary-brief-major">
          <div className="summary-brief-row">
            <div className="first heading">nickname</div>
            <div className="second heading">points</div>
          </div>
          {participants.map((set) => {
            const participantScore = ticket.scoreset.find(
              (score) => score.participant === set._id
            );
            return (
              <div
                key={`summaryset-${set.username}`}
                className="summary-brief-row"
              >
                <div className="first">{set.nickname}</div>
                <div className="second">
                  {participantScore && ticket.isRevealed
                    ? points.find(
                        (point) => point._id === participantScore.points
                      )
                      ? points.find(
                          (point) => point._id === participantScore.points
                        ).label
                      : "-"
                    : "-"}
                </div>
              </div>
            );
          })}
        </div>
        {ticket.isRevealed && (
          <div className="summary-brief-column summary-brief-minor">
            <div className="summary-points">
              <div className="summary-points-heading">votes distribution</div>
              <div className="summary-brief-row">
                <div className="first heading">Points</div>
                <div className="second heading">Votes</div>
              </div>
              {votesDistribution.map((distribution) => (
                <div
                  key={`distri-${distribution.point}`}
                  className="summary-brief-row"
                >
                  <div className="first">{distribution.point}</div>
                  <div className="second">{distribution.votes}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summary;
