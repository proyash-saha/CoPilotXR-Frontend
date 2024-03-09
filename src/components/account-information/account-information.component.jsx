import "./account-information.styles.scss";

const AccountInformation = () => {
  return (
    <div className="account-info-container">
      <div className="headers">First Name</div>
      <div className="info">John</div>
      <div className="headers">Last Name</div>
      <div className="info">Doe</div>
      <div className="headers">Email</div>
      <div className="info">johndoe@email.com</div>
      <div className="headers">Username</div>
      <div className="info">@codeiscaffeine</div>
      <div className="headers">Member since</div>
      <div className="info">March 1, 2020</div>
    </div>
  );
};

export default AccountInformation;
