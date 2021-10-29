import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { GET_VERSIONS } from "../gql/query";

const Sidebar = () => {
  const [versions, setVersion] = useState(null);
  const { data, loading } = useQuery(GET_VERSIONS);

  useEffect(() => {
    if (data) {
      setVersion(data.versions);
    }
  }, [data]); //Setting the useState hook with all the version once component is rendered.

  //This useCallback function taken a string argument of date and converts it into formatted date, e.g Day Month Date Year(Monday 1 Jan 1999)
  const date = useCallback((data) => {
    let dateString;
    dateString = new Date(data);
    return dateString.toDateString();
  }, []);

  const ready = versions && !loading; // This variable checks if data is present is versions and not in loading

  const handleNav = useCallback(
    (version) => window.location.replace(`/#version${version}`),
    []
  ); // This function helps in navigation between versions

  return (
    <>
      {loading && <h1 className="text-white">Loading...</h1>}
      {ready &&
        versions.map((data, index) => {
          return (
            <li
              key={index}
              className={"border-solid border-2 border-light-blue-500 m-2"}
            >
              <a
                className={"flex flex-col items-center h-12 cursor-pointer"}
                onClick={() => handleNav(data.version)} // This onClick function will act as navigation between different section we have
              >
                <div className="text-sm font-medium text-white">
                  {data.version} <br />
                </div>
                <div className="text-sm font-medium text-white">
                  {date(data.date)}
                </div>
              </a>
            </li>
          );
        })}
    </>
  );
};

export default Sidebar;
