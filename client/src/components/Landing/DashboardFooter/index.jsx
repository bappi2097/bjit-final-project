import Container from "../../UI/Container";
import classes from "./style.module.scss";
const Footer = () => {
    return (
        <Container type="footer" className={classes.footer}>
            <p>
                2021. PortfolioM. All rights reserved
            </p>
        </Container>
    );
}

export default Footer;