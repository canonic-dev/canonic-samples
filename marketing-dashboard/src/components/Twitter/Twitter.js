import React from "react";

import { Card, Elevation } from "@blueprintjs/core";
import { normaliseTwitterData } from "../../utils/normaliseData";

const Twitter = (twitter = {}) => {
  const twitterData = normaliseTwitterData(twitter);
  return (
    <div>
      <h5 style={{ fontSize: "large", textAlign: " left" }}>Twitter</h5>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Card
          interactive={true}
          elevation={Elevation.TWO}
          style={{
            minWidth: "200px",
            minHeight: "200px",
            maxWidth: "500px",
          }}
        >
          <h5 style={{ fontSize: "large", color: "#394b59" }}>
            {twitterData.accountInformation.title}
          </h5>
          <div style={{ fontSize: "medium" }}>
            <p>{twitterData.accountInformation.username}</p>
            <p>{twitterData.accountInformation.description}</p>
            <p>{twitterData.accountInformation.location}</p>
          </div>
        </Card>
        {twitterData?.metrics.map((card) => {
          return (
            <Card
              interactive={true}
              elevation={Elevation.TWO}
              style={{
                minWidth: "200px",
                minHeight: "200px",
              }}
              key={card.title}
            >
              <h5 style={{ fontSize: "large", color: "#394b59" }}>
                {card.title}
              </h5>
              <p style={{ fontSize: "xx-large" }}>{card.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Twitter;
