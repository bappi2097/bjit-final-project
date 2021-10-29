import Container from "../../UI/Container"
import classes from "./style.module.scss";
const Client = (props) => {
    const images = props.data.images ? props.data.images.map((image, index) => <li key={index + '-client'} style={{ backgroundImage: `url( ${image} )` }}></li>) : (<li style={{ backgroundImage: `url(https://cdn.flipsnack.com/site/images/business/discovery.gz.svg)` }}></li>);

    return (
        <Container className={classes.client}>
            <p>{props.data.content}</p>
            <ul>
                {images}
            </ul>
        </Container>
    )
}

export default Client;