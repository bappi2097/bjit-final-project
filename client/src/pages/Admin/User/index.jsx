import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import classes from "./style.module.scss";
import { MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { get, post } from "../../../services/api";
import { toast } from "react-toastify";
import swal from 'sweetalert';

const User = () => {
    const [users, setUsers] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [reload, setReload] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    var displayUsers = [];
    var pageCount = 0;

    useEffect(() => {
        get("admin/user").then(response => {
            console.log(response);
            setUsers(response.data.data);
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
                    post("/admin/user/" + id, formData).then(response => {
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

    if (users) {
        pageCount = Math.ceil(users.length / usersPerPage);
        displayUsers = users
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((column, index) => {
                return (
                    <tr key={"user" + index}>
                        <td>{index + 1}</td>
                        <td>{column.full_name}</td>
                        <td>
                            <img src={column.image} alt={column.full_name} />
                        </td>
                        <td>{column.email}</td>
                        <td>{column.is_admin ? "Admin" : "User"}</td>
                        <td className={classes.action}>
                            <Link className={classes.show_btn} to={"/user/edit/" + column.id}><MdRemoveRedEye /></Link>
                            <Link className={classes.edit_btn} to={"/user/edit/" + column.id}><MdEdit /></Link>
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
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/user/create">Add Type</Link>
            <table className={classes.datatable}>
                <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers ? displayUsers : (
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

export default User;