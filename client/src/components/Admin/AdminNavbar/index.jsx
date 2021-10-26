import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";

const DashboardNavbar = (props) => {
	const auth = useContext(AuthContext);
	return (
		<Container type="nav" className={classes.nav}>
			<Link to="/" className={classes.logo}>
				<img src={Logo} alt="Logo" />
			</Link>
			<div className={classes.navbar}>
				<ul>

				</ul>
			</div>
		</Container >
	);
};

export default DashboardNavbar;
