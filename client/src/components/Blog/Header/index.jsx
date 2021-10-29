import Container from "../../UI/Container";
import classes from "./style.module.scss";
const Header = (props) => {
    return (
        <Container type="header" className={classes.header}>
            <div>
                {props.data.content}
            </div>
            <div>
                <img src={props.data.image ? props.data.image : "https://cdn.flipsnack.com/site/images/home/online-flipbook-sample.webp"} alt="" />
            </div>
        </Container>
    );
}

export default Header;