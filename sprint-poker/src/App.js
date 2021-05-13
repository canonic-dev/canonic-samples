import React from "react";

import Dashboard from "./modules/Dashboard";
import Loader from "./components/Loader";
import EmptySessionState from "./modules/EmptySessionState";
import useCreateSession from "./hooks/useCreateSession";
import useJoinSession from "./hooks/useJoinSession";
import useGetSession from "./hooks/useGetSession";
import useGetTicket from "./hooks/useGetTicket";
import useCreateTicket from "./hooks/useCreateTicket";
import useUpdateTicket from "./hooks/useUpdateTicket";
import useUpdateNickname from "./hooks/useUpdateNickname";

function App() {
  const [session, setSession] = React.useState();
  const [participant, setParticipant] = React.useState();
  const [latestTicketId, setLatestTicketId] = React.useState("");
  const [activeTicket, setActiveTicket] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { createSession } = useCreateSession();
  const { getSession } = useGetSession();
  const { joinSession } = useJoinSession();
  const { createTicket } = useCreateTicket();
  const { getTicket } = useGetTicket();
  const { updateTicket } = useUpdateTicket();
  const { updateNickname } = useUpdateNickname();

  const getSessionData = React.useCallback(async () => {
    if (!session || !session._id) return;

    const { session: sessionData, success } = await getSession(session._id);

    if (!success) return;

    setSession(sessionData);
  }, [getSession, session]);

  const getTicketData = React.useCallback(async () => {
    if (!activeTicket || !activeTicket._id) return;

    const { tickets, success } = await getTicket(activeTicket.session);

    if (!success || !tickets.length) return;

    const currentTicket = tickets.find(
      (ticket) => `${ticket._id}` === `${activeTicket._id}`
    );
    setLatestTicketId(tickets[tickets.length - 1]._id);
    setActiveTicket(currentTicket);
  }, [activeTicket, getTicket]);

  const onCreateSession = React.useCallback(async () => {
    setLoading(true);

    const { session, participant, success, ticket } = await createSession();

    setLoading(false);
    if (!success) return;

    setActiveTicket(ticket);
    setLatestTicketId(ticket._id);
    setSession(session);
    setParticipant(participant);
  }, [createSession]);

  const onJoinSession = React.useCallback(
    async (id) => {
      setLoading(true);

      const { session, participant, ticket, success } = await joinSession(id);

      setLoading(false);
      if (!success) return;

      setActiveTicket(ticket);
      setLatestTicketId(ticket._id);
      setSession(session);
      setParticipant(participant);
    },
    [joinSession]
  );

  const handleCreateTicket = React.useCallback(async () => {
    if (!session || !session._id) return;

    setLoading(true);

    const { ticket, success } = await createTicket(session._id);

    setLoading(false);
    if (!success) return;

    setActiveTicket(ticket);
    setLatestTicketId(ticket._id);
  }, [createTicket, session]);

  const handleUpdateTicket = React.useCallback(
    (key) => async (value) => {
      switch (key) {
        case "scoreset":
          const scoreset = [
            ...activeTicket.scoreset.filter(
              (score) => score.participant !== participant._id
            ),
            {
              participant: participant._id,
              points: value,
            },
          ];

          setActiveTicket((ticket) => ({ ...ticket, scoreset }));
          await updateTicket(activeTicket._id, { ...activeTicket, scoreset });
          break;

        case "description":
          setActiveTicket((ticket) => ({ ...ticket, description: value }));
          await updateTicket(activeTicket._id, {
            ...activeTicket,
            description: value,
          });
          break;

        case "isRevealed":
          setActiveTicket((ticket) => ({ ...ticket, isRevealed: true }));
          await updateTicket(activeTicket._id, {
            ...activeTicket,
            isRevealed: true,
          });
          break;
        default:
          break;
      }
    },
    [activeTicket, participant, updateTicket]
  );

  const handleUpdateNickname = React.useCallback(
    async (nickname) => {
      if (!participant) return;

      setParticipant((participant) => ({ ...participant, nickname }));
      await updateNickname(participant._id, { ...participant, nickname });
    },
    [updateNickname, participant]
  );

  const handleReset = React.useCallback(() => {
    setSession();
    setActiveTicket();
  }, []);

  React.useEffect(() => {
    const sessionTimer = setTimeout(getSessionData, 2000);
    const ticketTimer = setTimeout(getTicketData, 2000);

    return () => {
      clearTimeout(sessionTimer);
      clearTimeout(ticketTimer);
    };
  }, [getSessionData, getTicketData]);

  return (
    <div id="insideRoot">
      <Loader color="#19267a" loading={loading} size="120px" />
      {!!session && !!participant && !!activeTicket ? (
        <Dashboard
          session={session}
          participant={participant}
          activeTicket={activeTicket}
          createTicket={handleCreateTicket}
          updateTicket={handleUpdateTicket}
          handleUpdateNickname={handleUpdateNickname}
          createSession={handleReset}
          isLatestTicket={`${latestTicketId}` === `${activeTicket._id}`}
          jumpToLatest={() =>
            setActiveTicket((ticket) => ({ ...ticket, _id: latestTicketId }))
          }
        />
      ) : (
        <EmptySessionState
          onCreateSession={onCreateSession}
          onJoinSession={onJoinSession}
        />
      )}
    </div>
  );
}

export default App;
