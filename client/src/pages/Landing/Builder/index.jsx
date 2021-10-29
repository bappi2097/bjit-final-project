import { Header, Footer, Client, NavBar, Showcase, Card, Container } from "../../../components/Blog/ImportAll";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import classes from "./style.module.scss";
import { useEffect } from "react";
import { get } from "../../../services/api";
const Builder = () => {
    useEffect(() => {
        // get()
    }, [])
    return (
        <Container>
            <Link className={`${classes.btn} ${classes.btn_primary}`}>Add Page</Link>
            <Card>
                {/*  */}
            </Card>
            <Link to="/section/create" className={`${classes.btn} ${classes.btn_primary}`}>Add Section</Link>
        </Container>
    )
}

export default Builder;