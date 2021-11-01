import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ROADMAP } from "../../gql/queries";
import { UPVOTE } from "../../gql/mutations";

import "./Roadmap.css";

function Roadmap() {
  const { data = {}, loading } = useQuery(GET_ROADMAP);
  const [upvoteTicket] = useMutation(UPVOTE, {
    context: {
      headers: {
        Authorization:
          "617bdcfc530d0d0009c04985-c2ca6caf-485c-4bc1-8ac8-4b9defe2707e",
      },
    },
  });

  const { roadmaps = [] } = data;

  const [upvotes, setUpvotes] = React.useState([]);

  // dividing tickets into their respective categories
  const exploringTickets = roadmaps.filter(
    (t) => t.stage.value === "EXPLORING"
  );
  const inProgressTickets = roadmaps.filter(
    (t) => t.stage.value === "IN_PROGRESS"
  );
  const doneTickets = roadmaps.filter((t) => t.stage.value === "DONE");
  const leavingItForNowTickets = roadmaps.filter(
    (t) => t.stage.value === "LEAVING_IT_FOR_NOW"
  );

  const columnMap = [
    {
      title: "Exploring",
      tickets: exploringTickets,
    },
    {
      title: "In Progress",
      tickets: inProgressTickets,
    },
    {
      title: "Done",
      tickets: doneTickets,
    },
    {
      title: "Leaving it for now",
      tickets: leavingItForNowTickets,
    },
  ];

  const handleUpvoteTicket = React.useCallback(
    async (id) => {
      setUpvotes((upvotes) => [...upvotes, id]);
      localStorage.setItem(`${id}`, true);

      upvoteTicket({ variables: { ticketId: id } });
    },
    [upvoteTicket]
  );

  const isTicketUpvoted = React.useCallback(
    (id) => !!upvotes.find((t) => t === id) || localStorage.getItem(id),
    [upvotes]
  );

  return (
    <div className="roadmap">
      {loading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{
            margin: "auto",
            background: "none",
            display: "block",
            shapeRendering: "auto",
            maxWidth: "30px",
            marginTop: "-20px",
          }}
          width="200px"
          height="200px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#4d5273"
            strokeWidth="10"
            r="35"
            strokeDasharray="164.93361431346415 56.97787143782138"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            ></animateTransform>
          </circle>
        </svg>
      ) : (
        <>
          {columnMap.map((column, i) => (
            <div className="roadmap-column" key={`${column.title}-${i}`}>
              <div className="roadmap-column-heading">{column.title}</div>
              <div className="roadmap-cards">
                {column.tickets.map((t, i) => (
                  <div key={`exploring-${i}`} className="roadmap-cards-item">
                    <div className="roadmap-cards-item-heading">{t.title}</div>
                    <div
                      className="roadmap-cards-item-content"
                      dangerouslySetInnerHTML={{ __html: t.description }}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 100 125"
                      style={{
                        enableBackground: "new 0 0 100 100",
                        maxWidth: "18px",
                        cursor: "pointer",
                      }}
                      className={!isTicketUpvoted(t._id) && "not-filled"}
                      onClick={() => handleUpvoteTicket(t._id)}
                    >
                      <g>
                        <g>
                          <path d="M81.7,40.4H64.6l3.6-17.9c0.5-2.5,0.1-5-1.2-7.1l0,0c-1.5-2.5-4.9-3-7-1.1L29.8,38.7c-1.2,1.1-1.8,2.6-1.8,4.1v33.1    c0,2.4,1.5,4.5,3.7,5.3l12.9,3.4c3.1,1.1,6.4,1.6,9.7,1.6h18c6.6,0,12.5-4.2,14.7-10.5l6.9-20c0.3-0.9,0.4-1.9,0.4-2.9v0    C94.3,46,88.7,40.4,81.7,40.4z" />
                          <path d="M22.2,40.4H7.8c-1.5,0-2.8,1.2-2.8,2.8v34c0,1.5,1.2,2.7,2.7,2.8h14.5c1.5,0,2.8-1.2,2.8-2.8v-34    C25,41.6,23.7,40.4,22.2,40.4z" />
                        </g>
                      </g>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Roadmap;
