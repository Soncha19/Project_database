import Team from "./Team";
import Profile from "./Profile";
import Start from "./Start";
import { Route, Routes} from "react-router-dom";
import Employee from "./Employee";
import {useEffect, useState} from "react";


function App() {
    const [teams, setTeams] = useState([])
useEffect(()=>{
    fetch('/teams',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setTeams(response))
    .catch(error => console.log(error))
  },[])
    return (
        <>
            <Routes>
                <Route path="/teams" element={<Team teams={teams}/>}/>
                <Route path="/employees" element={<Employee/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/sign" element={<Start/>}/>
            </Routes>
        </>

    );
}
export default App;