//This component render Description as per the version name.
const Main = ({ versions, loading }) => {
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
        versions
          .map((data, index) => {
            return (
              <div
                className="tab-content tab-space w-5/6 divide-y divide-light-blue-400"
                key={index}
              >
                <div
                  className={
                    "text-gray-900 text-2xl p-2 mt-16 w-40 my-4 ml-8 font-bold"
                  }
                >
                  Version {data.version}
                </div>
                <div className={"block"}>
                  <div>
                    {data.description
                      .map((item) => {
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
                              )} w-36 h-auto leading-8 ml-10 text-left font-bold shadow-lg mt-10 mb-3 text-white rounded-md`}
                            >
                              <span className="ml-4">{label}</span>
                            </div>
                            <div // Here we are using dangerouslySetInnerHTML because we receive the html code from API, we parse it using dangerouslySetInnerHTML
                              className="text-left ml-20 mt-4 text-gray-900"
                              dangerouslySetInnerHTML={{
                                __html: details,
                              }}
                            ></div>
                          </section>
                        );
                      })
                      .reverse()}
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
    </>
  );
};

export default Main;
