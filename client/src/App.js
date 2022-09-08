import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./app.scss";
import Footer from "./component/footer/Footer";
import Approach from "./pages/approach/Approach";
import Intro from "./pages/intro/Intro";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Team from "./pages/team/Team";
import Contact from "./pages/contact/Contact";
import Dashboard from "./pages/dashboard/Dashboard";
import { useContext } from "react";
import { Context } from "./context/Context";
import Admin from "./pages/admin/Admin";
import EditUser from "./pages/editUser/EditUser";
import Delete from "./pages/deleteConfirmation/Delete";
import Bootcamp from "./pages/Bootcamp";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="section">
            <Intro />
            <Approach />
            <Team />
            <Contact />
            <Footer />
          </div>
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/dashboard" /> : <Register />}
        </Route>
        <Route path="/login">
          {user ? (
            <Redirect
              to={user && user.user.isAdmin ? "/admin" : "/dashboard"}
            />
          ) : (
            <Login />
          )}
        </Route>
        <Route path="/dashboard">
          {user && !user.user.isAdmin ? (
            <Dashboard />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/admin">
          {user && user.user.isAdmin ? <Admin /> : <Redirect to="/login" />}
        </Route>
        <Route path="/edit-user">
          {user && user.user.isAdmin ? <EditUser /> : <Login />}
        </Route>
        <Route path="/user/delete">
          {user && user.user.isAdmin ? <Delete /> : <Login />}
        </Route>
        <Route path="/bootcamp">{<Bootcamp />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
