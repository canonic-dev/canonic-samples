import axios from "axios";

import { UPDATE_TICKET, AXIOS_CONFIG } from "../const/api";

function useUpdateTicket() {
  const updateTicket = async (id, updateData) => {
    try {
      await axios.patch(UPDATE_TICKET(id), { input: updateData }, AXIOS_CONFIG);

      return {
        success: true,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    updateTicket,
  };
}

export default useUpdateTicket;
