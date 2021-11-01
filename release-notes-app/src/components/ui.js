import Header from "./header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const UI = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-row ">
        <div className="flex flex-col bg-blue-500 text-white w-96 mobile:hidden">
          <ul className="flex flex-col py-4 sticky top-0">
            <Sidebar />
          </ul>
        </div>
        <div>
          <Main />
        </div>
      </div>
    </>
  );
};

export default UI;
