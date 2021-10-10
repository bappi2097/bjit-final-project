import React, { Fragment } from 'react';
import classes from "./style.module.scss";
import Header from '../../../components/Landing/Header';
import Container from '../../../components/UI/Container';
import Client from '../../../components/Landing/Client';
import Showcase from '../../../components/Landing/Showcase';
import { Link } from 'react-router-dom';
const Home = (props) => {
    const images = [
        "https://cdn.flipsnack.com/site/images/business/discovery.gz.svg",
        "https://cdn.flipsnack.com/site/images/business/discovery.gz.svg",
        "https://cdn.flipsnack.com/site/images/business/discovery.gz.svg",
        "https://cdn.flipsnack.com/site/images/business/discovery.gz.svg",
        "https://cdn.flipsnack.com/site/images/business/discovery.gz.svg"
    ];

    return (
        <Fragment>
            <Header />
            <Container className={classes.create__div}>
                <Link to="/signup" className={`${classes.btn} ${classes.btn_primary}`}>Create your own site</Link>
            </Container>
            <Client images={images} />
            <Showcase />
        </Fragment>
    )
}

export default Home;