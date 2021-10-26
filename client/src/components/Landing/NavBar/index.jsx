import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import { toast } from "react-toastify";

const NavBar = (props) => {
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
			<Link to="/" className={classes.logo}>
				<img src={Logo} alt="Logo" />
			</Link>
			<div className={classes.navbar}>
				<ul>
					<li>
						<a href="/">Features</a>
					</li>
					<li>
						<a href="/">Pricing</a>
					</li>
					<li>
						<a href="/">About Us</a>
					</li>
					{
						auth.isLoggedIn &&
						(
							<li>
								<Link to="/dashboard">Dashboard</Link>
							</li>
						)
					}

					{
						!auth.isLoggedIn &&
						(<li>
							<Link to="/signin" className={`${classes.btn} ${classes.btn_outline_secondary}`}>Sign In</Link>
						</li>)
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

export default NavBar;
