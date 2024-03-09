import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component";
import Register from "./routes/register/register.component";
import LogIn from "./routes/log-in/log-in.component";
import Home from "./routes/home/home.component";
import Account from "./routes/account/account.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="register" element={<Register />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="home" element={<Home />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default App;
