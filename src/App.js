import "./App.css";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  withRouter,
  HashRouter as Router,
  Link,
} from "react-router-dom";

import { Threedee } from "./Threedee";
import { Twodee } from "./Twodee";
import { Twodeetest } from "./Twodeetest";

const Nav = () => {
  return (
    <div style={{ margin: "auto" }}>
      <p>
        Electric Vehicles Matrix:
        <a href="https://gist.githubusercontent.com/Emceelamb/565435c5930849fa9ad1b75571ac5d07/raw/d54ed7b4fa0cd936d4c1e7b0164906f330145962/gme_correlation.json">
          data
        </a>
      </p>
      <ul>
        <li>
          <Link to="/two">2D</Link>
        </li>
        <li>
          <Link to="/three">3D</Link>
        </li>
      </ul>
    </div>
  );
};
function App() {
  return (
    <>
      <Router basename="">
        <Nav />
        <Routes>
          <Route exact path="" element={<Threedee />} />
          <Route exact path="/three" element={<Threedee />} />
          <Route exact path="/two" element={<Twodee />} />
          <Route exact path="/tww" element={<Twodeetest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
