import { Outlet } from "react-router-dom";

import CoPilotXRLogo from "../../assets/CoPilotXR_01.png";

import "./landing-page.styles.scss";

const LandingPage = () => {
  return (
    <div className="message-container">
      <div className="first-message">Hi there!</div>
      <div className="second-message">Welcome to</div>
      <div>
        <img className="logo" src={CoPilotXRLogo} alt="CoPilotXRLogo" />
      </div>
      <Outlet />
    </div>
  );
};

export default LandingPage;
