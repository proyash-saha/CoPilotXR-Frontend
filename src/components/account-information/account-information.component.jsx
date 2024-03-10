import { useContext } from "react";

import { UserContext } from "../../contexts/user.context";

import "./account-information.styles.scss";

const AccountInformation = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="account-info-container">
      <div className="headers">First Name</div>
      <div className="info">{user.firstName}</div>
      <div className="headers">Last Name</div>
      <div className="info">{user.lastName}</div>
      <div className="headers">Email</div>
      <div className="info">{user.email}</div>
      <div className="headers">Member since</div>
      <div className="info">{user.creationDate}</div>
    </div>
  );
};

export default AccountInformation;
