import "@/styles/layout/navbar.css";

interface NavbarProps {
  fixed?: boolean;
  color?: boolean;
  margin?: string;
}

export default function Navbar({fixed, color, margin}: NavbarProps) {
  const Logo = "HELLDESTRUCTION";

  return (
    <nav className={` h-12 flex items-center justify-between mix-blend-color-multiply  ${fixed ? "fixed top-0 left-0 right-0" : ""} ${margin ? margin : ""}`} style={{mixBlendMode: 'difference'}}>
      <h1 className={`font-bagos font-bold text-2xl ${color ? "text-primary-700" : "text-white"}`}>{Logo}</h1>
      <div className="h-full w-16 rounded-xl flex items-center justify-center cursor-pointer menu-toggle bg-gray-200">
        {/* <button className="mx-4 px-3 py-1 bg-primary-600 text-white rounded-md">Login</button> */}
        <button className="w-full menu-button flex flex-col h-6 justify-between items-center m-4 cursor-pointer ">
          <div className="w-8 h-1 rounded-md bg-black"></div>
          <div className="w-8 h-1 rounded-md bg-black"></div>
          <div className="w-8 h-1 rounded-md bg-black"></div>
        </button>
      </div>
    </nav>
    
  );
}
