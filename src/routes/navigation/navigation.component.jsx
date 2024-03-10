import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

import CoPilotXRLogo from "../../assets/CoPilotXR_02.png";

import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img className="logo" src={CoPilotXRLogo} alt="CoPilotXRLogo" />
        </Link>
        <div className="nav-links-container">
          <Link className="log-in-nav-link" to="/log-in">
            Log In
          </Link>
          <Link className="register-nav-link" to="/register">
            Register
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
