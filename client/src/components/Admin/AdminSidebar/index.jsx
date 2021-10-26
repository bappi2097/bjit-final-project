import classes from "./style.module.scss";
import { AiFillHome, AiFillCodepenSquare } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { FaUserAlt, FaImage, FaGlobe } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const AdminSidebar = (props) => {
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
                            <NavLink activeClassName={classes.active} to="/dashboard"><FaGlobe /> Website</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={classes.active} to="/section"><AiFillCodepenSquare />Section</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default AdminSidebar;