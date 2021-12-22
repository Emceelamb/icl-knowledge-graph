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
import { TwodeePolling } from "./TwodeePolling";
import { ThreedeePolling } from "./ThreedeePolling";
import { TwoNode } from "./TwoNode";
import { TwoNode3d } from "./TwoNode3d";
import { TwoNodeD3 } from "./TwoNodeD3";
import { Dag } from './Dag';

const Nav = () => {
  return (
    <div style={{ margin: "auto" }}>
      <p>
        Electric Vehicles Matrix:
        <a href="https://gist.githubusercontent.com/Emceelamb/565435c5930849fa9ad1b75571ac5d07/raw/d54ed7b4fa0cd936d4c1e7b0164906f330145962/gme_correlation.json">
          data
        </a>
      </p>
      <ul className="menu">
        <li>
          <Link to="/two">2D</Link>
        </li>
        <li>
          <Link to="/three">3D</Link>
        </li>
        <li>
          <Link to="/polling">2D polling</Link>
        </li>
        <li>
          <Link to="/3dpolling">3D polling</Link>
        </li>
        <li>
          <Link to="/2node">2Node</Link>
        </li>
        <li>
          <Link to="/2node3d">2Node 3d</Link>
        </li>
        <li>
          <Link to="/2nodeD3">2Node D3</Link>
        </li>
        <li>
          <Link to="/dag">Dag</Link>
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
          <Route exact path="/polling" element={<TwodeePolling />} />
          <Route exact path="/3dpolling" element={<ThreedeePolling />} />
          <Route exact path="/2node" element={<TwoNode/>} />
          <Route exact path="/2node3d" element={<TwoNode3d/>} />
          <Route exact path="/2nodeD3" element={<TwoNodeD3/>} />
          <Route exact path="/dag" element={<Dag/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
