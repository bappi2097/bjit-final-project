import { Fragment, useContext } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import NavBar from "../../../components/Landing/NavBar";
import DashboardNavbar from "../../../components/Landing/DashboardNavbar";
import Footer from "../../../components/Landing/Footer";
import DashboardFooter from "../../../components/Landing/DashboardFooter";
import Home from ".";
import SignUp from "../SignUp";
import Login from "../Login";
import ForgetPassword from "../ForgetPassword";
import VerifyEmail from "../VerifyEmail";
import ResetPassword from "../ResetPassword";
import Dashboard from "../Dashboard";
import AuthContext from "../../../store/auth-context.js"
import PageNotFound from "../PageNotFound";

const Landing = (props) => {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const navbar = ["/dashboard"].includes(location.pathname) ? <DashboardNavbar /> : <NavBar />;
    const footer = ["/dashboard"].includes(location.pathname) ? <DashboardFooter /> : <Footer />;

    return (
        <Fragment>
            {navbar}
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                {!auth.isLoggedIn && <Route path="/signin">
                    <Login />
                </Route>}
                {!auth.isLoggedIn && <Route path="/signup">
                    <SignUp />
                </Route>}
                {!auth.isLoggedIn && <Route path="/forget-password">
                    <ForgetPassword />
                </Route>}
                {!auth.isLoggedIn && <Route path="/reset-password/:remember_token">
                    <ResetPassword />
                </Route>}
                {!auth.isLoggedIn && <Route path="/verify-email/:remember_token">
                    <VerifyEmail />
                </Route>}

                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="*">
                    <PageNotFound />
                </Route>
            </Switch>
            {footer}
        </Fragment>
    )
}
export default Landing;