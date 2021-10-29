import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";
import AuthContext from "../../../store/auth-context";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from "../../../services/api";

const DashboardNavbar = (props) => {
	const auth = useContext(AuthContext);
	const history = useHistory();

	const logoutHandler = (event) => {
		event.preventDefault();
		auth.onLogout();
		toast.success("Successfully Logout");
		history.push({
			pathname: "/",
		});
	}
	return (
		<Container type="nav" className={classes.nav}>
			<NavLink activeClassName={classes.active} to="/" className={classes.logo}>
				<img src={Logo} alt="Logo" />
			</NavLink>
			<div className={classes.navbar}>
				<ul>
					{
						auth.isLoggedIn &&
						(
							<li>
								<NavLink activeClassName={classes.active} to="/dashboard">Dashboard</NavLink>
							</li>
						)
					}
					{
						auth.isLoggedIn &&
						(
							<li>
								<NavLink activeClassName={classes.active} to="/builder">Builder</NavLink>
							</li>
						)
					}
					{
						auth.isLoggedIn &&
						(
							<li>
								<NavLink activeClassName={classes.active} to={`/blog/newsfeed`}>NewsFeed</NavLink>
							</li>
						)
					}
					{
						(auth.isLoggedIn && !auth.isAdmin) &&
						(
							<li>
								<NavLink activeClassName={classes.active} to="/blogs">Blogs</NavLink>
							</li>
						)
					}
					{
						auth.isLoggedIn &&
						(<li>
							<a className={`${classes.btn} ${classes.btn_outline_secondary}`} href="/" onClick={logoutHandler}>Logout</a>
						</li>)
					}
				</ul>
			</div>
		</Container >
	);
};

export default DashboardNavbar;
