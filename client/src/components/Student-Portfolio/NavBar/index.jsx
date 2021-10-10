import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";

const NavBar = (props) => {
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
					<li>
						<Link to="/signin" className={`${classes.btn} ${classes.btn_outline_secondary}`}>Sign In</Link>
					</li>
				</ul>
			</div>
		</Container >
	);
};

export default NavBar;
