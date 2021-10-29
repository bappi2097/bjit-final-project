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
import Builder from "../Builder";
import Section from "../Section";
import AddSection from "../Section/Add";
import EditSection from "../Section/Edit";
import NewsFeed from "../../Blog/NewsFeed";
import Category from "../../Blog/Category";
import AddCategory from "../../Blog/Category/Add";
import EditCategory from "../../Blog/Category/Edit";
import AddPost from "../../Blog/Post/Add";
import EditPost from "../../Blog/Post/Edit";
import Details from "../../Blog/Details";
import Blogs from "../../Blog/Blogs";

const Landing = (props) => {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const navbar = ["/dashboard", "/builder"].includes(location.pathname) ? <DashboardNavbar /> : <NavBar />;
    const footer = ["/dashboard", "/builder"].includes(location.pathname) ? <DashboardFooter /> : <Footer />;

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
                <Route path="/builder">
                    <Builder />
                </Route>

                {/* <Route path="/Page" exact>
                                <Page />
                            </Route>
                            <Route path="/Page/create">
                                <AddPage />
                            </Route>
                            <Route path="/Page/edit/:id">
                                <EditPage />
                            </Route> */}
                <Route path="/section" exact>
                    <Section />
                </Route>
                <Route path="/section/create">
                    <AddSection />
                </Route>
                <Route path="/section/edit/:id">
                    <EditSection />
                </Route>
                <Route path="/blog/newsfeed">
                    <NewsFeed />
                </Route>

                <Route path="/blog/category" exact>
                    <Category />
                </Route>

                <Route path="/blog/category/create" exact>
                    <AddCategory />
                </Route>

                <Route path="/blog/category/edit/:id" exact>
                    <EditCategory />
                </Route>

                <Route path="/blog/post/create" exact>
                    <AddPost />
                </Route>

                <Route path="/blog/post/edit/:id" exact>
                    <EditPost />
                </Route>
                <Route path="/blog/single/:slug" exact>
                    <Details />
                </Route>

                <Route path="/blogs" exact>
                    <Blogs />
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