import axios from "axios";

import { CREATE_PARTICIPANT, CREATE_SESSION, AXIOS_CONFIG } from "../const/api";
import { getNewNickname } from "../utils";

function useCreateSession() {
  const createSession = async () => {
    const name = getNewNickname();

    try {
      const { data: participantData } = await axios.post(
        CREATE_PARTICIPANT,
        {
          input: {
            username: `${name}${Math.floor(Math.random() * Math.max(100000))}`,
            nickname: name,
          },
        },
        AXIOS_CONFIG
      );

      const { data: sessionData } = await axios.post(
        CREATE_SESSION,
        {
          input: {
            participants: [`${participantData.data._id}`],
          },
        },
        AXIOS_CONFIG
      );

      return {
        success: true,
        session: sessionData.data.session,
        ticket: sessionData.data.ticket,
        participant: participantData.data,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    createSession,
  };
}

export default useCreateSession;
