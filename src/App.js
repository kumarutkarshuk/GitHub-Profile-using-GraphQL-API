
import { useState } from "react";
import Data from "./components/Data";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import '@fontsource/space-mono';

function App() {

  const [isLight, setIsLight] = useState(true); //have to store preference and use the function for updating

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#141D2F] text-white font-mono"> 
    {/* text white */}
      <div className="flex flex-col gap-[36px]">

        <div className="flex">
          <h1>GitHub</h1>

          <div className="flex items-center w-[90px] tracking-[2.5px]
                          font-bold">
            <p>
              {isLight ? "LIGHT" : "DARK"}
            </p>
            {isLight ? <MdLightMode/> : <MdDarkMode/>}
          </div>
        </div>
        
        <div className="bg-[#1E2A47] relative rounded-[15px] flex h-[100%] justify-center items-center">
        {/* box shadow and background for icon*/}
          <input type="text" placeholder="Enter a GitHub username..."/>
          <AiOutlineSearch/>
          {/* icon styling */}
          <button className="bg-[#0079ff] hover:bg-[#60abff] font-bold 
          min-w-[84px] rounded-[10px]">Search</button>
        </div>

        <div>
          <Data></Data>
        </div>

        </div>

    </div>
  );
}

export default App;
