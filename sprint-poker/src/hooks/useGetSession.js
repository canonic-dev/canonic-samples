import axios from "axios";

import { GET_SESSION } from "../const/api";

function useGetSession() {
  const getSession = async (id) => {
    try {
      const { data } = await axios.get(GET_SESSION(id));

      return {
        success: true,
        session: data.data,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    getSession,
  };
}

export default useGetSession;
