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
      {loading && <h1 className="text-gray-900">Loading...</h1>}
      {ready &&
        versions
          .map((data, index) => {
            return (
              <li key={index} className={"m-2 ml-4"}>
                <a
                  className={"flex flex-col items-left h-12 cursor-pointer"}
                  onClick={() => handleNav(data.version)} // This onClick function will act as navigation between different section we have
                >
                  <div className="text-sm font-medium text-gray-900">
                    {data.version} <br />
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {date(data.date)}
                  </div>
                </a>
              </li>
            );
          })
          .reverse()}
    </>
  );
};

export default Sidebar;
