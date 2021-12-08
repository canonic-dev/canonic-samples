import React from "react";
import axios from "axios";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import { Card, Statistic } from "semantic-ui-react";

import "./DashboardGrid.css";

const DASHBOARD_API_URL =
  "https://postgres-dashboard-7fc.can.canonic.dev/api/projects/dashboard";

function DashboardGrid() {
  const [dashboardCount, setDashboardCount] = React.useState({});

  React.useEffect(() => {
    axios(DASHBOARD_API_URL).then(({ data }) => setDashboardCount(data.data));
  }, []);

  const DASHBOARD_BOXES = [
    {
      title: "Total Users",
      className: "purple",
      value: dashboardCount?.usersCount,
    },
    {
      title: "Total Projects",
      className: "green",
      value: dashboardCount?.projectsCount,
    },
    {
      title: "In Progress",
      value: dashboardCount?.inProgressCount,
    },
    {
      title: "Completed",
      value: dashboardCount?.completedCount,
    },
  ];

  const { projects = [], users = [] } = dashboardCount || {};
  const PREVIOUS_WEEK_DATA = [
    {
      name: "30th Nov",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638230400000 && created_at < 1638316799000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638230400000 && created_at < 1638316799000
      ).length,
    },
    {
      name: "1st Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638316800000 && created_at < 1638403199000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638316800000 && created_at < 1638403199000
      ).length,
    },
    {
      name: "2nd Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638403200000 && created_at < 1638489599000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638403200000 && created_at < 1638489599000
      ).length,
    },
    {
      name: "3rd Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638489600000 && created_at < 1638575999000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638489600000 && created_at < 1638575999000
      ).length,
    },
    {
      name: "4th Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638576000000 && created_at < 1638662399000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638576000000 && created_at < 1638662399000
      ).length,
    },
    {
      name: "5th Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638662400000 && created_at < 1638748799000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638662400000 && created_at < 1638748799000
      ).length,
    },
    {
      name: "6th Dec",
      projects: projects.filter(
        (created_at) =>
          created_at >= 1638748800000 && created_at < 1638835199000
      ).length,
      users: users.filter(
        (created_at) =>
          created_at >= 1638748800000 && created_at < 1638835199000
      ).length,
    },
  ];

  return (
    <div className="dashboardGrid">
      <div className="dashboardGrid-boxes">
        {DASHBOARD_BOXES.map((box, i) => (
          <Card className="dashboardGrid-boxes-item" centered raised>
            <Statistic
              className={box.className ? box.className : ""}
              as="h4"
              label={box.title}
              value={box.value ? box.value : "-"}
            />
          </Card>
        ))}
      </div>
      <div>
        <div className="dashboardGrid-chart">
          New users/projects trend per day
        </div>
        <AreaChart
          width={700}
          height={250}
          data={PREVIOUS_WEEK_DATA}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
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
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            name="Projects"
            type="monotone"
            dataKey="projects"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            name="Users"
            type="monotone"
            dataKey="users"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default DashboardGrid;
