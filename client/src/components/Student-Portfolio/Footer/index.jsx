import Container from "../../UI/Container";
import classes from "./style.module.scss";
import Logo from "../../../logo.svg";
const Footer = () => {
    return (
        <Container type="footer" className={classes.footer}>
            <div className={classes.left__side}>
                <div>
                    <h1>For Creative</h1>
                    <ul>
                        <li><a href="/">Photographers</a></li>
                        <li><a href="/">Artists</a></li>
                        <li><a href="/">Fashion</a></li>
                        <li><a href="/">Designers</a></li>
                        <li><a href="/">Illustrators</a></li>
                    </ul>
                </div>
                <div>
                    <h1>For Creative</h1>
                    <ul>
                        <li><a href="/">Photographers</a></li>
                        <li><a href="/">Artists</a></li>
                        <li><a href="/">Fashion</a></li>
                        <li><a href="/">Designers</a></li>
                        <li><a href="/">Illustrators</a></li>
                    </ul>
                </div>
                <div>
                    <h1>For Creative</h1>
                    <ul>
                        <li><a href="/">Photographers</a></li>
                        <li><a href="/">Artists</a></li>
                        <li><a href="/">Fashion</a></li>
                        <li><a href="/">Designers</a></li>
                        <li><a href="/">Illustrators</a></li>
                    </ul>
                </div>

            </div>
            <div className={classes.right__side}>
                <img src={Logo} alt="logo" /><br />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing. Voluptatum eum dolorum beatae asperiores, nihil possimus nobis vero
                </p>
                <address>
                    33/4, Shyamoli <br />
                    Dhaka-1207<br />
                    +981 - 378 - 207
                </address>
            </div>
            <hr />
            <p>
                2021. PortfolioM. All rights reserved
            </p>
        </Container>
    );
}

export default Footer;