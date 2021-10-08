import Container from "../../UI/Container"
import classes from "./style.module.scss";
const Client = (props) => {
    const images = props.images.length > 0 && props.images.map((image, index) => <li key={index + '-client'} style={{ backgroundImage: `url( ${image} )` }}></li>);

    return (
        <Container className={classes.client}>
            <p>Trusted by the world’s most innovative businesses</p>
            <ul>
                {images}
            </ul>
        </Container>
    )
}

export default Client;