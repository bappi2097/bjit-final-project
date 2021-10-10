import React, { Fragment } from 'react';
import classes from "./style.module.scss";
import Header from '../../../components/Landing/Header';
import Container from '../../../components/UI/Container';
import Client from '../../../components/Landing/Client';
import Showcase from '../../../components/Landing/Showcase';
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
                <a href="/" className={`${classes.btn} ${classes.btn_primary} ${classes.create__btn}`}>Create your own site</a>
            </Container>
            <Client images={images} />
            <Showcase />
        </Fragment>
    )
}

export default Home;