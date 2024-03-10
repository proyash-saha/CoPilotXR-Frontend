import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import CoPilotXRLogo from "../../assets/CoPilotXR_02.png";
import { UserContext } from "../../contexts/user.context";

import "./navigation.styles.scss";

const Navigation = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img className="logo" src={CoPilotXRLogo} alt="CoPilotXRLogo" />
        </Link>
        <div className="nav-links-container">
          {user ? (
            <div>
              <Link className="home-nav-link" to="/home">
                Home
              </Link>
              <Link className="account-nav-link" to="/account">
                Account
              </Link>
              <Link className="log-out-nav-link" onClick={logout} to="/">
                LogOut
              </Link>
            </div>
          ) : (
            <div>
              <Link className="log-in-nav-link" to="/log-in">
                Log In
              </Link>
              <Link className="register-nav-link" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
