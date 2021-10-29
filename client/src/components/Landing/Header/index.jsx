import { Link } from "react-router-dom";
import Container from "../../UI/Container";
import classes from "./style.module.scss";
const Header = (props) => {
    return (
        <Container type="header" className={classes.header}>
            <div>
                <h1>Create a stunning portfolio online</h1>
                <p>
                    Create, share and embed online page flip catalogs, transforming your PDFs into online flipping books. Make a flip book online using our advanced flip book maker. It's free to try!
                </p>
                <Link to="/signup" className={`${classes.btn} ${classes.btn_primary}`}>Get Started</Link>
            </div>
            <div>
                <img src="https://cdn.flipsnack.com/site/images/home/online-flipbook-sample.webp" alt="" />
            </div>
        </Container>
    );
}

export default Header;