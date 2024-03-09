import "./subscription.styles.scss";

const Subscription = () => {
  return (
    <div className="subscription-info-container">
      <div className="headers">Subscription type</div>
      <div className="info">Monthly</div>
      <div className="headers">Amount</div>
      <div className="info">CAD $9.99</div>
      <div className="headers">Next billing date</div>
      <div className="info">June 1, 2024</div>
    </div>
  );
};

export default Subscription;
