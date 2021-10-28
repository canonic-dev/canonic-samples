import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ROADMAP } from "../../gql/queries";

import "./Roadmap.css";

function Roadmap() {
  const [roadmap, setRoadmap] = React.useState([]);
  const { data } = useQuery(GET_ROADMAP);

  React.useEffect(() => {
    if (data) {
      setRoadmap(data.roadmaps);
    }
  }, [data]);

  // dividing tickets into their respective categories
  const exploringTickets = roadmap.filter((t) => t.stage.value === "EXPLORING");
  const inProgressTickets = roadmap.filter(
    (t) => t.stage.value === "IN_PROGRESS"
  );
  const doneTickets = roadmap.filter((t) => t.stage.value === "DONE");
  const leavingItForNowTickets = roadmap.filter(
    (t) => t.stage.value === "LEAVING_IT_FOR_NOW"
  );

  return (
    <div className="roadmap">
      <div className="roadmap-column">
        <div className="roadmap-column-heading">Exploring</div>
        <div className="roadmap-cards">
          {exploringTickets.map((t, i) => (
            <div key={`exploring-${i}`} className="roadmap-cards-item">
              <div className="roadmap-cards-item-heading">{t.title}</div>
              <div
                className="roadmap-cards-item-content"
                dangerouslySetInnerHTML={{ __html: t.description }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="roadmap-column">
        <div className="roadmap-column-heading">In Progress</div>
        <div className="roadmap-cards">
          {inProgressTickets.map((t, i) => (
            <div key={`exploring-${i}`} className="roadmap-cards-item">
              <div className="roadmap-cards-item-heading">{t.title}</div>
              <div
                className="roadmap-cards-item-content"
                dangerouslySetInnerHTML={{ __html: t.description }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="roadmap-column">
        <div className="roadmap-column-heading">Done</div>
        <div className="roadmap-cards">
          {doneTickets.map((t, i) => (
            <div key={`exploring-${i}`} className="roadmap-cards-item">
              <div className="roadmap-cards-item-heading">{t.title}</div>
              <div
                className="roadmap-cards-item-content"
                dangerouslySetInnerHTML={{ __html: t.description }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="roadmap-column">
        <div className="roadmap-column-heading">Leaving it for now</div>
        <div className="roadmap-cards">
          {leavingItForNowTickets.map((t, i) => (
            <div key={`exploring-${i}`} className="roadmap-cards-item">
              <div className="roadmap-cards-item-heading">{t.title}</div>
              <div
                className="roadmap-cards-item-content"
                dangerouslySetInnerHTML={{ __html: t.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Roadmap;
