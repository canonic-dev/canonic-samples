import React from "react";

import "./PointSystem.css";

function PointSystem({
  selectedPoint,
  points = [],
  isRevealed,
  onRevealClick,
  onPointSelect,
}) {
  const revealedClassName = isRevealed ? "revealed" : "";
  return (
    <div className="point">
      <div className="point-heading">points</div>
      <div className="point-container">
        <div className="point-wrapper">
          {points.map((point) => {
            const isPointSelected = selectedPoint
              ? selectedPoint.points === point._id
              : false;
            const pointSelectedClassName = isPointSelected ? "selected" : "";
            return (
              <div
                className={`point-selection ${pointSelectedClassName}`}
                key={`pointSys-${point._id}`}
                onClick={() => onPointSelect(point._id)}
              >
                {point.label}
              </div>
            );
          })}
        </div>
        <div
          className={`point-reveal ${revealedClassName}`}
          onClick={onRevealClick}
        >
          reveal votes
        </div>
      </div>
    </div>
  );
}

export default PointSystem;
