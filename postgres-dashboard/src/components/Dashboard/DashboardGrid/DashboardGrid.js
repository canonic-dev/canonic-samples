import React from "react";
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

const DASHBOARD_BOXES = [
  {
    title: "Total Users",
    className: "purple",
  },
  {
    title: "Total Projects",
    className: "green",
  },
  {
    title: "Projects Created",
  },
  {
    title: "Projects Completed",
  },
];

const RECHARTS_DATA = [
  {
    name: "Week 1",
    projects: 120,
    users: 89,
  },
  {
    name: "Week 2",
    projects: 101,
    users: 98,
  },
  {
    name: "Week 3",
    projects: 91,
    users: 104,
  },
  {
    name: "Week 4",
    projects: 168,
    users: 81,
  },
  {
    name: "Week 5",
    projects: 189,
    users: 95,
  },
  {
    name: "Week 6",
    projects: 144,
    users: 68,
  },
  {
    name: "Week 7",
    projects: 156,
    users: 73,
  },
];

function DashboardGrid() {
  return (
    <div className="dashboardGrid">
      <div className="dashboardGrid-boxes">
        {DASHBOARD_BOXES.map((box, i) => (
          <Card className="dashboardGrid-boxes-item" centered raised>
            <Statistic
              className={box.className ? box.className : ""}
              as="h4"
              label={box.title}
              value="89"
            />
          </Card>
        ))}
      </div>
      <div>
        <div className="dashboardGrid-chart">
          New users/projects trend per week
        </div>
        <AreaChart
          width={700}
          height={250}
          data={RECHARTS_DATA}
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
