import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./style.module.scss";
import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { get, post } from "../../../services/api";
import { toast } from "react-toastify";
import swal from 'sweetalert';

const Blog = () => {
    const [websiteTypes, setWebsiteTypes] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [reload, setReload] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    var displayWebsiteTypes = [];
    var pageCount = 0;

    useEffect(() => {
        get("admin/blog-post").then(response => {
            setWebsiteTypes(response.data.data);
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
                    post("/admin/blog-post/" + id, formData).then(response => {
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

    if (websiteTypes) {
        pageCount = Math.ceil(websiteTypes.length / usersPerPage);
        displayWebsiteTypes = websiteTypes
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((column, index) => {
                return (
                    <tr key={"blog-post-type" + index}>
                        <td>{index + 1}</td>
                        <td>{column.title}</td>
                        <td>
                            <img width={40} src={process.env.REACT_APP_IMAGE_URL + column.image} alt={column.title} />
                        </td>
                        <td style={{ width: "300px" }}>{column.summery}</td>
                        <td className={classes.action}>
                            <Link className={classes.edit_btn} to={"/blog/edit/" + column.id}><MdEdit /></Link>
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
        <div>
            <table className={classes.datatable}>
                <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Summery</th>
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
        </div>
    )
}

export default Blog;