import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Suspense } from "react";

import Explore from "./components/Explore";
import Profile from "./components/Profile";
import Landing from "./components/Landing";

 
function App() {

  return (
    <>
      <Router>
        <Routes>  
          <Route path="/" element={<Suspense fallback={"loading..."}><Landing></Landing></Suspense>}></Route>
          <Route path="/signin" element={<div>Sign In</div>}></Route>
            <Route path="/signup" element={<div>Sign Up</div>}></Route>
          <Route path="/explore" element={<Suspense fallback={"loading..."}><Explore></Explore></Suspense>}></Route>
          <Route path="/profile" element={<Suspense fallback={"loading..."}><Profile></Profile></Suspense>}></Route>
        </Routes>
      </Router>
    </>
  )
}

// function App() {

//   return (
//     <>
//       <WithoutNavBar></WithoutNavBar>
//       <NavBar></NavBar>
//     </>
//   )
// }

export default App