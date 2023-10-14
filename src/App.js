
import { useState } from "react";
import Data from "./components/Data";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import '@fontsource/space-mono';

function App() {

  const [isLight, setIsLight] = useState(true); //have to store preference and use the function for updating

  return (
    <div className="h-screen w-screen flex justify-center bg-[#141D2F] text-white font-mono text-xl"> 
    
      <div className="flex flex-col gap-5 w-[35%] my-5">

        <div className="flex justify-between">
          <h1 className="font-extrabold">DevDetective</h1>

          <div className="flex items-center w-[15%] 
                           justify-center text-base gap-1">
            <p>
              {isLight ? "LIGHT" : "DARK"}
            </p>
            {isLight ? <MdLightMode/> : <MdDarkMode/>}
          </div>

        </div>
        
        <div className="bg-[#1E2A47] flex justify-evenly items-center rounded-lg w-full h-12 p-1 gap-2">
          <AiOutlineSearch/>
          <input type="text" placeholder="Enter a GitHub username..." className=" bg-inherit w-[75%] focus:outline-none"/>
          
          <button className="bg-[#0079ff] hover:bg-[#60abff] font-bold 
                              rounded-md px-3 py-2 text-base">Search</button>
        </div>

        <div>
          <Data></Data>
        </div>

        </div>

    </div>
  );
}

export default App;
