import axios from "axios";

import { CREATE_TICKET, AXIOS_CONFIG } from "../const/api";

function useCreateTicket() {
  const createTicket = async (id) => {
    try {
      const { data } = await axios.post(
        CREATE_TICKET,
        { input: { session: id } },
        AXIOS_CONFIG
      );

      return {
        success: true,
        ticket: data.data,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    createTicket,
  };
}

export default useCreateTicket;
