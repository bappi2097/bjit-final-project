import Container from "../../../components/UI/Container"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../../components/UI/Card";
import classes from "./style.module.scss";
import Loop from "../../../components/UI/Loop";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { get } from "../../../services/api";
import { toast } from "react-toastify";
import ReactHtmlParser from 'react-html-parser';

const NewsFeed = () => {
    const [posts, setPosts] = useState([]);
    const [nextUrl, setnextUrl] = useState([]);
    useEffect(() => {
        get("/user/blog-post/user-post").then(response => {
            setPosts(response.data.data.data);
            setnextUrl(response.data.data.next_page_url);
        }).catch(errors => {
            console.log(errors);
            if (errors.data) {
                toast.error(errors.data.message);
            }
        });
    }, []);
    const loadMore = () => {
        get(nextUrl).then(response => {
            setnextUrl(response.data.data.next_page_url);
            setPosts([...posts, ...response.data.data.data])
        }).catch(errors => {
            console.log(errors);
        });
    }
    return (
        <Fragment>
            <div className={`${classes.row} ${classes.justify_content_center}`}>
                <Link to={`/blog/category`} className={`${classes.btn} ${classes.btn_link}`}>Category</Link>
                <Link to={`/blog/post/create`} className={`${classes.btn} ${classes.btn_link}`}>Create Post</Link>
            </div>
            <Container className={classes.main_container} style={{ marginBottom: "20px" }}>
                <div>
                    {posts.length > 0 && posts.map((value, index) => {
                        return (
                            <Card className={classes.newsfeed__card}>
                                <div className={classes.card__header}>
                                    <h3>{value.title}</h3>
                                    <Link to={`/blog/post/edit/${value.id}`} className={`${classes.btn} ${classes.btn_primary}`}>Edit</Link>
                                </div>
                                {value.image && (
                                    <img src={process.env.REACT_APP_IMAGE_URL + value.image} alt={value.title} />
                                )}
                                <p>
                                    {ReactHtmlParser(value.summery)}
                                </p>
                                <br />
                                <div className={`${classes.row}`}>
                                    Tags:&nbsp;&nbsp;&nbsp;
                                    <span className={`${classes.badge} ${classes.badge_light}`}>Tag1</span>
                                </div>
                                <div className={`${classes.row} ${classes.justify_content_between}`}>
                                    <Link to={`/blog/single/${value.slug}`} className={`${classes.btn} ${classes.btn_primary}`}>More Details</Link>
                                    <Link to={`/blog/single/${value.slug}`} className={`${classes.btn} ${classes.btn_outline_secondary}`}>
                                        <FaRegCommentAlt /> {value.blog_comments.length}
                                    </Link>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Container>
            {
                nextUrl && (
                    <button style={{ marginLeft: "30%", marginBottom: "20px" }} onClick={loadMore} className={`${classes.btn} ${classes.btn_primary}`}>
                        Load More
                    </button>
                )
            }
        </Fragment>
    )
}

export default NewsFeed;