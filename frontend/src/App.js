import Team from "./Team";
import Profile from "./Profile";
import Start from "./Start";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Employee from "./Employee";


function App() {

    return (
        <>
            <Routes>
                <Route path="/teams" element={<Team/>}/>
                <Route path="/employees" element={<Employee/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/sign" element={<Start/>}/>
            </Routes>
        </>
    );
}

export default App;