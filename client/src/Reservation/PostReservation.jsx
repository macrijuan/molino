import { useDispatch, useSelector } from "react-redux";
import {postReservation} from "../redux/actions/reservation.js";


function PostReservation(){
  const dispatch=useDispatch();
  const user = useSelector(state=>state.user.id)
  function handleSubmit(){
    dispatch(postReservation({
      table:document.getElementById("table").value,
      date:document.getElementById("date").value
    }, user));
  };
  return(
    <form onSubmit={()=>{handleSubmit();}}>
      <input id="table"/>
      <input id="date"/>
    </form>
  );
};

export default PostReservation;