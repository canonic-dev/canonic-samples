import React from "react";

import { Card, Elevation } from "@blueprintjs/core";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import {
  normaliseYoutubeMetrics,
  normaliseEstimatedMinutesWatched,
  normaliseEstimatedMinutesPerCountry,
} from "../../utils/normaliseData";

const Youtube = ({
  youtubeMetrics = {},
  youtubeMinutesDay = {},
  youtubeMinutesCountry = {},
}) => {
  const youtubeData = normaliseYoutubeMetrics(youtubeMetrics);
  const estimatedMinutesWatched =
    normaliseEstimatedMinutesWatched(youtubeMinutesDay);
  const estimatedMinutesWatchedCountry = normaliseEstimatedMinutesPerCountry(
    youtubeMinutesCountry
  );
  return (
    <div>
      <h5 style={{ fontSize: "large", textAlign: " left" }}>Youtube</h5>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {youtubeData?.map((card) => {
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
        <Line
          data={estimatedMinutesWatched}
          style={{ maxHeight: "60%", maxWidth: "47%", marginTop: "10px" }}
        />
        <Bar
          data={estimatedMinutesWatchedCountry}
          style={{ maxHeight: "60%", maxWidth: "47%", marginTop: "10px" }}
        />
      </div>
    </div>
  );
};

export default Youtube;
