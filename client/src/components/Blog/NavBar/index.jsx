import Container from "../../UI/Container";
import Logo from "../../../logo.svg";
import classes from "./style.module.scss";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {

	return (
		<Container type="nav" className={classes.nav}>
			<NavLink to="/" className={classes.logo}>
				<img src={props.data.logo ? props.data.logo : Logo} alt="Logo" />
			</NavLink>
			<div className={classes.navbar}>
				<ul>
					{props.data.link && props.data.link.map((value, index) => {
						return (
							<li>
								<NavLink activeClassName="active" to={value.url}>{value.name}</NavLink>
							</li>
						)
					})}
				</ul>
			</div>
		</Container >
	);
};

export default NavBar;
