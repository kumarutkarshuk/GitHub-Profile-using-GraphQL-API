import Data from "./components/Data";

import {AiOutlineSearch, AiFillGithub} from "react-icons/ai";
import '@fontsource/space-mono';

import { useState } from "react";


function App() {
  const [val, setVal] = useState('');
  function changeHandler(e){
    setVal(e.target.value);
    // console.log(val);
  }

  const [username, setUsername] = useState('');
  function clickHandler(){
    setUsername(val);
    // console.log(val);
  }
  function keyHandler(e){
    if(e.key === 'Enter'){
      setUsername(val);
    // console.log(val);
    }
    
  }
  
  return (
    <div className="min-h-screen w-screen flex justify-center bg-[#141D2F] text-white font-mono text-xl"> 
    
      <div className="flex flex-col gap-6 w-[80%] md:w-[35%] my-5 items-center">
        
        <div className="flex flex-col justify-center items-center text-center md:flex-row md:items-center gap-2">
          <AiFillGithub/>
          <h1 className="font-extrabold">Search GitHub Profile</h1>
        </div>
        
        
        <div className="bg-[#1E2A47] flex justify-evenly items-center rounded-xl w-full h-14 md:p-1 gap-2">
          <div className="hidden md:block"><AiOutlineSearch/></div>
          <input type="text" placeholder="Enter a GitHub username..." className=" bg-inherit w-[75%] focus:outline-none text-base h-[100%] 
          md:text-lg" onChange={changeHandler}
            onKeyDown={keyHandler}
          />
          <button className="bg-[#0079ff] hover:bg-[#60abff] font-bold 
                              rounded-md px-3 py-2 text-base hidden md:block" onClick={clickHandler} >Search</button>
          <button className="block md:hidden" onClick={clickHandler}><AiOutlineSearch/></button>
        </div>

        
        {username && <Data username={username}/>}


      </div>
      
    </div>
  );
}

export default App;
