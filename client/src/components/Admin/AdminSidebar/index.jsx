import { useContext } from "react";
import classes from "./style.module.scss";
import { AiFillHome, AiFillCodepenSquare } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserAlt, FaImage, FaGlobe } from "react-icons/fa";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context.js";
import { toast } from "react-toastify";
const AdminSidebar = (props) => {
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
        <div className={`${classes.left_menu} ${props.className}`}>
            <div>
                <nav className={classes.animated}>
                    <ul>
                        <li>
                            <NavLink activeClassName={classes.active} to="/dashboard"><AiFillHome /> Dashboard</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/user"><FaUserAlt /> User</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/website-type"><BiCategoryAlt /> Website Type</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/theme"><FaImage /> Theme</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/website"><FaGlobe /> Website</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/section"><AiFillCodepenSquare />Section</NavLink>
                        </li>
                        {
                            auth.isLoggedIn &&
                            (<li>
                                <a className={`${classes.btn_outline_danger}`} href="/" onClick={logoutHandler}>Logout</a>
                            </li>)
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default AdminSidebar;