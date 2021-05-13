import axios from "axios";

import { GET_ALL_POINTS, AXIOS_CONFIG } from "../const/api";

function useAllPoints() {
  const getAllPoints = async () => {
    try {
      const { data } = await axios.get(GET_ALL_POINTS, AXIOS_CONFIG);

      return {
        success: true,
        points: data.data,
      };
    } catch (e) {
      return { success: false, error: e };
    }
  };

  return {
    getAllPoints,
  };
}

export default useAllPoints;
