import React, { Fragment } from 'react';
// import classes from "./style.module.scss";
import NavBar from '../../../components/Landing/NavBar';
import Header from '../../../components/Landing/Header';
import Client from '../../../components/Landing/Client';
import Showcase from '../../../components/Landing/Showcase';
import Footer from '../../../components/Landing/Footer';
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
            <NavBar />
            <Header />
            <Client images={images} />
            <Showcase />
            <Footer />
        </Fragment>
    )
}

export default Home;