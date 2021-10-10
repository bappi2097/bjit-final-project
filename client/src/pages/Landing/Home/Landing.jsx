import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../../components/Landing/NavBar";
import Footer from "../../../components/Landing/Footer";
import Home from ".";
import SignUp from "../SignUp";
import Login from "../Login";
const Landing = (props) => {

    return (
        <Fragment>
            <NavBar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
            <Footer />
        </Fragment>
    )
}
export default Landing;