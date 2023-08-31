import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import Home from "./Home/Home";

function Header(){
  const location = useLocation();
  return (
    <div>
      <h1>El Molino</h1>
      {
      location.pathname==="/"
      ?null
      :<button><Link to="/">Go Home</Link></button>
      }
      {/* <img src="https://drive.google.com/uc?export=view&id=1D3pniMYjQJSnW7L9K560tLKGdKNmTGma" alt="recive" style={{width:"15%"}}/> */}
      {/* <button style={{position:"absolute", top:"20%", left:"50%"}}>Just  Button</button> */}
      
    </div>
  );
};

export default Header