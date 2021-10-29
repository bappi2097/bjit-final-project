import Container from "../../UI/Container"
import classes from "./style.module.scss";
import { FiArrowRight } from "react-icons/fi";
const Showcase = (props) => {
    return (
        <Container type="section" className={classes.showcase}>
            {props.data.content}
            <div className={classes.showcase__container}>
                {props.data.posts && props.data.posts.map((value, index) => {
                    return (
                        <a href="/" className={classes.showcase__card} style={{ backgroundImage: value.image ? value.image : `url('https://cdn.portfoliobox.net/000_clients/000_org/salesite2021/images/cards/photographers-mobile.webp')` }}>
                            <span className={classes.showcase__title}>{value.title}</span>
                            <span className={classes.showcase__link}>
                                <span>Read More</span>
                                <FiArrowRight />
                            </span>
                        </a>
                    )
                })}
            </div>
        </Container>
    )
}

export default Showcase;