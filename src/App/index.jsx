import logo from "../logo.svg";
import "../App.css";
import HomePage from "../pages/user/Home";
import UserLayout from "../layout/userLayout";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
