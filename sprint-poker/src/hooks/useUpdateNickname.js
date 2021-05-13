import axios from "axios";

import { UPDATE_PARTICIPANT, AXIOS_CONFIG } from "../const/api";

function useUpdateNickname() {
  const updateNickname = async (id, data) => {
    try {
      await axios.patch(UPDATE_PARTICIPANT(id), { input: data }, AXIOS_CONFIG);

      return {
        success: true,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    updateNickname,
  };
}

export default useUpdateNickname;
