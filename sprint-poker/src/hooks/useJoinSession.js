import axios from "axios";

import { JOIN_SESSION, AXIOS_CONFIG } from "../const/api";
import { getNewNickname } from "../utils";

function useJoinSession() {
  const joinSession = async (id) => {
    try {
      const name = getNewNickname();

      const { data } = await axios.put(
        JOIN_SESSION(id),
        {
          username: `${name}${Math.floor(Math.random() * Math.max(100000))}`,
          nickname: name,
          id,
        },
        AXIOS_CONFIG
      );

      return {
        success: true,
        session: data.data.session,
        participant: data.data.participant,
        ticket: data.data.tickets ? data.data.tickets[0] : data.data.ticket[0],
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    joinSession,
  };
}

export default useJoinSession;
