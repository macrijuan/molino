import { useState } from "react";
import { useSelector } from "react-redux";

function Reservation(){
  const user = useSelector(state=>state.user.email);
  const [menu, setMenu]=useState(false);
  function handleClick(){
    if(menu){
      setMenu(false);
    }else{
      setMenu(true);
    };
  };
  return(
    <div>
      <button>Reservations</button>
      {
       menu&&user
       ?<div>
          <Link to="reserves"><button type="button">Ver mis reservas</button></Link>
          <Link to="post_reserve"><button type="button">Hacer una reserva</button></Link>
       </div>
       :null
      }
    </div>
  );
};

export default Reservation;