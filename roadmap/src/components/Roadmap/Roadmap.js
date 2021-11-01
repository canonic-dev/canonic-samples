import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import { GET_ROADMAP } from "../../gql/queries";
import { UPVOTE } from "../../gql/mutations";

import { ReactComponent as LoaderIcon } from "../../icons/loader.svg";
import { ReactComponent as UpvoteIcon } from "../../icons/upvote.svg";

import "./Roadmap.css";

function Roadmap() {
  const { data = {}, loading } = useQuery(GET_ROADMAP);
  const [upvoteTicket] = useMutation(UPVOTE, {
    context: {
      headers: {
        /**
         * Setting the authorization token for using Canonic APIs
         * You can generate your own token for your API, visit this url
         * for more information - https://docs.canonic.dev/concepts/projects/permissions
         */
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

  /**
   * Handles upvoting of tickets
   * - Makes an API call to create an upvote
   * - Saves the vote in localstorage
   */
  const handleUpvoteTicket = React.useCallback(
    async (id) => {
      setUpvotes((upvotes) => [...upvotes, id]);
      localStorage.setItem(`${id}`, true);

      upvoteTicket({ variables: { ticketId: id } });
    },
    [upvoteTicket]
  );

  /**
   * Checks in the localstorage and upvotes state
   * to find whether ticket is upvoted or not
   */
  const isTicketUpvoted = React.useCallback(
    (id) => !!upvotes.find((t) => t === id) || localStorage.getItem(id),
    [upvotes]
  );

  return (
    <div className="roadmap">
      {loading ? (
        <LoaderIcon />
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
                    <div className="roadmap-cards-item-upvote">
                      <UpvoteIcon
                        className={!isTicketUpvoted(t._id) ? "not-filled" : ""}
                        onClick={() => handleUpvoteTicket(t._id)}
                      />
                      <div className="roadmap-cards-item-upvote-count">{`${
                        parseInt(t.upvotes?.count) +
                        (isTicketUpvoted(t._id) ? 1 : 0)
                      }`}</div>
                    </div>
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
