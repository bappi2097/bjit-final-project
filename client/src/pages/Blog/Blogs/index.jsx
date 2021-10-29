import Container from "../../../components/UI/Container"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../../components/UI/Card";
import classes from "./style.module.scss";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { get } from "../../../services/api";
import { toast } from "react-toastify";
import ReactHtmlParser from 'react-html-parser';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nextUrl, setNextUrl] = useState([]);
    const [filterId, setFilterId] = useState(0);
    useEffect(() => {
        get("/user/blog-post").then(response => {
            console.log(response);
            setPosts(response.data.data.data);
            setNextUrl(response.data.data.next_page_url);
        }).catch(errors => {
            console.log(errors);
            if (errors.data) {
                toast.error(errors.data.message);
            }
        });
        get("/user/blog-category").then(response => {
            setCategories(response.data.data);
        })
    }, []);
    const loadMore = () => {
        get(nextUrl).then(response => {
            setNextUrl(response.data.data.next_page_url);
            setPosts([...posts, ...response.data.data.data])
        }).catch(errors => {
            console.log(errors);
        });
    }

    const filter = (id) => {
        setFilterId(id);
    }
    return (
        <Fragment>
            <Container className={classes.main_container} style={{ marginBottom: "20px" }}>
                <Card className={classes.blog_category}>
                    <h4>Filter By Category</h4>
                    <ul>
                        <li key={"categoredfdf"} onClick={() => { filter(0) }}>All</li>
                        {categories && categories.map((value, index) => {
                            return (
                                <li key={"categore" + index} onClick={() => { filter(value.id) }}>{value.name}</li>
                            )
                        })}
                    </ul>
                </Card>
                <div>
                    {posts.length > 0 && posts.map((value, index) => {
                        return (
                            <Card className={classes.newsfeed__card} style={{ display: (filterId === value.blog_category_id || filterId === 0) ? "" : "none" }}>
                                <div className={classes.card__header}>
                                    <h3>{value.title}</h3>
                                </div>
                                {value.image && (
                                    <img src={process.env.REACT_APP_IMAGE_URL + value.image} alt={value.title} />
                                )}
                                <p>
                                    {ReactHtmlParser(value.summery)}
                                </p>
                                <br />
                                <div className={`${classes.row}`}>
                                    Category:&nbsp;&nbsp;&nbsp;
                                    <span className={`${classes.badge} ${classes.badge_light}`}>{value.blog_category.name}</span>
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

export default Blogs;