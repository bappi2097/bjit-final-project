import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../../../components/Landing/NavBar";
import Footer from "../../../components/Landing/Footer";
import Home from "../../Landing/Home";
import PageNotFound from "../PageNotFound";
import Dashboard from "../Dashboard";
import AdminNavbar from "../../../components/Admin/AdminNavbar";
import DashboardFooter from "../../../components/Landing/DashboardFooter";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import classes from "./style.module.scss";
import WebsiteType from "../WebsiteType";
import AddWebsiteType from "../WebsiteType/Add";
import EditWebsiteType from "../WebsiteType/Edit";
import Theme from "../Theme";
import AddTheme from "../Theme/Add";
import EditTheme from "../Theme/Edit";
import Section from "../Section";
import AddSection from "../Section/Add";
import EditSection from "../Section/Edit";
import User from "../User";
import AddUser from "../User/Add";
import EditUser from "../User/Edit";

const Admin = (props) => {
    return (
        <Fragment>
            <Switch>
                <Route path="/" exact>
                    <NavBar />
                    <Home />
                    <Footer />
                </Route>
                <Fragment>
                    <AdminNavbar />
                    <div className={classes.wrapper}>
                        <AdminSidebar className={classes.sidebar} />
                        <div className={classes.wrapper__content}>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/website-type" exact>
                                <WebsiteType />
                            </Route>
                            <Route path="/website-type/create">
                                <AddWebsiteType />
                            </Route>
                            <Route path="/website-type/edit/:id">
                                <EditWebsiteType />
                            </Route>
                            <Route path="/theme" exact>
                                <Theme />
                            </Route>
                            <Route path="/theme/create">
                                <AddTheme />
                            </Route>
                            <Route path="/theme/edit/:id">
                                <EditTheme />
                            </Route>
                            <Route path="/section" exact>
                                <Section />
                            </Route>
                            <Route path="/section/create">
                                <AddSection />
                            </Route>
                            <Route path="/section/edit/:id">
                                <EditSection />
                            </Route>
                            <Route path="/user" exact>
                                <User />
                            </Route>
                            <Route path="/user/create">
                                <AddUser />
                            </Route>
                            <Route path="/user/edit/:id">
                                <EditUser />
                            </Route>
                        </div>
                    </div>
                    <DashboardFooter />
                </Fragment>
                <Route path="*">
                    <NavBar />
                    <PageNotFound />
                    <Footer />
                </Route>
            </Switch>
        </Fragment>
    )
}
export default Admin;