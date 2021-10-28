import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_VERSIONS } from "../gql/query";

const Sidebar = () => {
  const [versions, setVersion] = useState(null);
  const { data, loading } = useQuery(GET_VERSIONS);

  useEffect(() => {
    if (data) {
      setVersion(data.versions);
    }
  }, [data]); //Setting the useState hook with all the version once component is rendered.

  let date = ""; // We will use this below in JSX to parse string as date.

  return (
    <>
      {loading && <h1 className="text-white">Loading...</h1>}
      {versions &&
        !loading &&
        versions.map((data, index) => {
          return (
            <li
              key={index}
              className={"border-solid border-2 border-light-blue-500 m-2"}
            >
              <a
                className={"flex flex-col items-center h-12 cursor-pointer"}
                onClick={(e) => {
                  window.location.replace(`/#version${data.version}`);
                }} // This onClick function will act as navigation between different section we have
              >
                <div className="text-sm font-medium text-white">
                  {" "}
                  {data.version} <br />{" "}
                </div>

                <div className="text-sm font-medium text-white">
                  {" "}
                  {
                    ((date = data.date),
                    (date = new Date(data.date)),
                    date.toDateString()) // Here we are parsing string as date
                  }
                </div>
              </a>
            </li>
          );
        })}
    </>
  );
};

export default Sidebar;
