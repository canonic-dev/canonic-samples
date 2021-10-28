// This is header component that displays project title at the top of the page

const Header = () => {
  console.log();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-600	 p-6">
      <div className="flex items-center flex-no-shrink text-white mr-6 w-full justify-center">
        <span className="font-semibold text-xl tracking-tight">
          The Release Notes App
        </span>
      </div>
    </nav>
  );
};

export default Header;
