import React from "react";
import axios from "axios";
import { Table, Loader, Dimmer } from "semantic-ui-react";

import "./DashboardTable.css";

const GET_PROJECTS_URL =
  "https://postgres-dashboard-7fc.can.canonic.dev/api/projects";
function DashboardTable() {
  const [loading, setLoading] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios(GET_PROJECTS_URL).then(({ data }) => {
      setProjects(data.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="dashboardTable-wrapper">
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
      <Table textAlign="left" celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects.map((item, i) => (
            <Table.Row>
              <Table.Cell width={2} className="dashboardTable-cell-name">
                <div>{item.name}</div>
              </Table.Cell>
              <Table.Cell width={5}>
                <div>{item.description}</div>
              </Table.Cell>
              <Table.Cell width={1}>
                <div>{item.users.name}</div>
              </Table.Cell>
              <Table.Cell width={1}>
                <div
                  className={`dashboardTable-status ${
                    item.status === "completed" && "green-row"
                  }`}
                >
                  {item.status}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashboardTable;
