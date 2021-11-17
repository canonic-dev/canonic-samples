import React from "react";
import { Table } from "semantic-ui-react";

import "./DashboardTable.css";

const TABLE_DATA = [
  {
    name: "Lorem Ipsum",
    email: "lorem@ipsum.com",
    projectsCreated: 5,
    projectsCompleted: 3,
  },
];

function DashboardTable() {
  return (
    <div className="dashboardTable">
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Projects created</Table.HeaderCell>
            <Table.HeaderCell>Projects completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TABLE_DATA.map((item, i) => (
            <Table.Row>
              <Table.Cell>
                <div>{item.name}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.email}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.projectsCreated}</div>
              </Table.Cell>
              <Table.Cell>
                <div>{item.projectsCompleted}</div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DashboardTable;
