import "./App.css";
import {
  Router,
  BrowserRouter,
  Routes,
  Route,
  withRouter,
} from "react-router-dom";

import { Threedee } from "./Threedee";
import { Twodee } from "./Twodee";

const Nav = () => {
  return (
    <div style={{ margin: "auto" }}>
      <ul>
        <li>
          <a href="/two">2D</a>
        </li>
        <li>
          <a href="/three">3D</a>
        </li>
      </ul>
    </div>
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Nav />} />
          <Route exact path="/three" element={<Threedee />} />
          <Route exact path="/two" element={<Twodee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
