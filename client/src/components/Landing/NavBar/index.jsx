import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";

const NavBar = (props) => {
	return (
		<Container type="nav" className={classes.nav}>
			<a href="/" className={classes.logo}>
				<img src={Logo} alt="Logo" />
			</a>
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
						<a href="/" className={`${classes.btn} ${classes.btn_outline_secondary}`}>Sign In</a>
					</li>
				</ul>
			</div>
		</Container >
	);
};

export default NavBar;
