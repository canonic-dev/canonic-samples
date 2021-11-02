import Header from "./Header";
import Sidebar from "./Sidebar";
import Main from "./Main";

const UI = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-row">
        <div className="flex flex-col bg-gray-100	text-white w-6/12 mobile:hidden">
          <ul className="flex flex-col py-4 sticky top-0  divide-y divide-y divide-gray-400">
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
