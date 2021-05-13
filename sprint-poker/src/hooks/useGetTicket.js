import axios from "axios";

import { GET_TICKET } from "../const/api";

function useGetTicket() {
  const getTicket = async (id) => {
    try {
      const { data } = await axios.get(GET_TICKET(id));

      return {
        success: true,
        tickets: data.data,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    getTicket,
  };
}

export default useGetTicket;
