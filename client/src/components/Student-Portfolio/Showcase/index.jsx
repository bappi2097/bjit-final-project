import Container from "../../UI/Container"
import classes from "./style.module.scss";
import Loop from "../../UI/Loop";
import { FiArrowRight } from "react-icons/fi";
const Showcase = (props) => {
    return (
        <Container type="section" className={classes.showcase}>
            <h1>We’ve covered all</h1>
            <p>The leading online website builder for creative professionals</p>
            <div className={classes.showcase__container}>
                <Loop count={5}>
                    <a href="/" className={classes.showcase__card} style={{ backgroundImage: `url('https://cdn.portfoliobox.net/000_clients/000_org/salesite2021/images/cards/photographers-mobile.webp')` }}>
                        <span className={classes.showcase__title}>Photographers</span>
                        <span className={classes.showcase__link}>
                            <span>Learn More</span>
                            <FiArrowRight />
                        </span>
                    </a>
                </Loop>
            </div>
        </Container>
    )
}

export default Showcase;