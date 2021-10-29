//This component render Description as per the version name.

import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_VERSIONS } from "../gql/query";

const Main = () => {
  const [versions, setVersions] = useState();
  const { data, loading } = useQuery(GET_VERSIONS);

  useEffect(() => {
    if (data) {
      let getVersions = data.versions;
      setVersions(getVersions);
    }
  }, [data]); // We are fetching 'Versions' and feeding it to useState hook

  const setColor = (label) => {
    // We are using this util function to assign a color the label.
    let color = "bg-red-600";
    switch (label) {
      case "Security fixes":
        color = "bg-pink-600";
        break;
      case "Bug fixes":
        color = "bg-yellow-600";
        break;
      case "Changes":
        color = "bg-green-500";
        break;
      case "Known issue":
        color = "bg-blue-600";
        break;
      default:
        color = "";
    }
    return color;
  };

  return (
    <>
      {versions &&
        !loading &&
        versions.map((data, index) => {
          return (
            <div className="tab-content tab-space w-5/6" key={index}>
              <div
                className={
                  "text-white bg-blue-600 text-center text-2xl p-2 mt-16 w-40 my-8 mx-auto"
                }
              >
                Version {data.version}
              </div>
              <div className={"block"}>
                <div>
                  {data.description.map((item) => {
                    // The Description in our API is a 'field set' and it two fields, 1. Details and  2. Label
                    const details = item.details; // Here we are accessing the details, details contains all the text.
                    const label = item.types.label; // Here we are accessing picker option's label. There are total 4 labels. 1. Security Fixes 2. Bug fixes, 3. Changes and 4. Know issue
                    return (
                      <section
                        className="flex flex-col  mb-10"
                        id={`version${data.version}`}
                      >
                        <div
                          className={`${setColor(
                            label
                          )} w-28 h-8 leading-8 ml-10 text-center font-bold shadow-lg mt-10 mb-3 text-white`}
                        >
                          {label}
                        </div>
                        <div // Here we are using dangerouslySetInnerHTML because we receive the html code from API, we parse it using dangerouslySetInnerHTML
                          className="text-left ml-20 text-white"
                          dangerouslySetInnerHTML={{
                            __html: details,
                          }}
                        ></div>
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Main;
