import Card from "../../../components/UI/Card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Fragment, useEffect, useState } from "react";
import classes from "./style.module.scss";
import { get } from "../../../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState([])
    useEffect(() => {
        get("/admin/dashboard-info").then(response => {
            setDashboardData(response.data.data);
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }, [])
    return (
        <div className={classes.main__container}>
            <Card className={classes.card__container}>
                <Card className={classes.card__div}>
                    <h2>{dashboardData.no_of_users}</h2>
                    <h4>Registered User</h4>
                </Card>
                <Card className={classes.card__div}>
                    <h2>{dashboardData.no_of_websites}</h2>
                    <h4>Websites</h4>
                </Card>
                <Card className={classes.card__div}>
                    <h2>{dashboardData.no_of_sections}</h2>
                    <h4>Sections</h4>
                </Card>
                <Card className={classes.card__div}>
                    <h2>{dashboardData.website_percentage}%</h2>
                    <h4>Website Creation</h4>
                </Card>
            </Card>
            <Card className={classes.areachart__div}>
                <h2>Visitor vs. Website Create</h2>
                <AreaChart width={730} height={250} data={dashboardData.areachart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="registered" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="website" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </Card>
            <Card className={classes.areachart__div}>
                <h2>Visitor vs. Blog vs. Comment</h2>
                <AreaChart width={730} height={250} data={dashboardData.blogchart}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPx" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="15%" stopColor="#f4f3f6" stopOpacity={0.8} />
                            <stop offset="90%" stopColor="#ff7950" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Area type="monotone" dataKey="Registered" stroke="#0884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="Post" stroke="#02ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    <Area type="monotone" dataKey="Comment" stroke="#ba000d" fillOpacity={1} fill="url(#colorPx)" />
                </AreaChart>
            </Card>
        </div>
    )
}
export default Dashboard;