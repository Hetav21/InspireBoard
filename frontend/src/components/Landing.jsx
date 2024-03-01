import {useNavigate} from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
        <button onClick={() => {navigate("/signin")}}>Sign In</button>
        <br></br>
        <button onClick={() => {navigate("/signup")}}>Sign Up</button>
    </div>
  )
}