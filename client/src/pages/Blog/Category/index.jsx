import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./style.module.scss";
import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { get, post } from "../../../services/api";
import { toast } from "react-toastify";
import swal from 'sweetalert';
import Container from "../../../components/UI/Container";

const Category = () => {
    const { websiteSlug } = useParams();
    const [blogCategories, setBlogCategories] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [reload, setReload] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    var displayWebsiteTypes = [];
    var pageCount = 0;

    useEffect(() => {
        get("/user/blog-category").then(response => {
            setBlogCategories(response.data.data);
        }).catch(errors => {
            console.log(errors);
        });
    }, [reload]);

    const deleteHandler = (event, id) => {
        event.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const formData = new FormData();
                    formData.append("_method", "DELETE");
                    post("/user/blog-category/" + id, formData).then(response => {
                        swal(response.data.message, {
                            icon: "success",
                        });
                        setReload(Math.random());
                    }).catch(errors => {
                        toast.error(errors.data.message);
                    });
                } else {
                    swal("Something went wrong!");
                }
            });
    }

    if (blogCategories) {
        pageCount = Math.ceil(blogCategories.length / usersPerPage);
        displayWebsiteTypes = blogCategories
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((column, index) => {
                return (
                    <tr key={"blog-category" + index}>
                        <td>{index + 1}</td>
                        <td>{column.name}</td>
                        <td>{column.slug}</td>
                        <td className={classes.action}>
                            <Link className={classes.show_btn} to={`/blog/category/edit/` + column.id}><MdRemoveRedEye /></Link>
                            <Link className={classes.edit_btn} to={`/blog/category/edit/` + column.id}><MdEdit /></Link>
                            <form onSubmit={(e) => { deleteHandler(e, column.id) }}>
                                <button className={classes.delete_btn}><MdDeleteForever /></button>
                            </form>
                        </td>
                    </tr>
                )
            });
    }



    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <Container style={{ margin: "20px" }}>
            <div className={`${classes.row} ${classes.justify_content_center}`}>
                <Link to={`/blog/category`} className={`${classes.btn} ${classes.btn_link}`}>Category</Link>
                <Link to={`/blog/post/create`} className={`${classes.btn} ${classes.btn_link}`}>Create Post</Link>
            </div>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to={`/blog/category/create`}>Add Type</Link>
            <table className={classes.datatable}>
                <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayWebsiteTypes ? displayWebsiteTypes : (
                        <tr className={classes.not_available}>
                            <td colSpan="4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={classes.paginationBttns}
                previousLinkClassName={classes.previousBttn}
                nextLinkClassName={classes.nextBttn}
                disabledClassName={classes.paginationDisabled}
                activeClassName={classes.paginationActive}
            />
        </Container>
    )
}

export default Category;