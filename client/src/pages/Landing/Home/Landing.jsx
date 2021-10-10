import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../../components/Landing/NavBar";
import Footer from "../../../components/Landing/Footer";
import Home from ".";
import SignUp from "../SignUp";
import Login from "../Login";
import ForgetPassword from "../ForgetPassword";
const Landing = (props) => {

    return (
        <Fragment>
            <NavBar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/signin">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/forget-password">
                    <ForgetPassword />
                </Route>
            </Switch>
            <Footer />
        </Fragment>
    )
}
export default Landing;