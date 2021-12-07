import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { GET_CUSTOMERS_INFO } from "../../gql/queries";
import { useQuery } from "@apollo/client";

import { dummyData } from "../../DummyData";
import { getColumns, getRows } from "../../utils/normaliseTableData";

const InformationTable = () => {
  // const { data = {}, loading } = useQuery(GET_CUSTOMERS_INFO);
  const data = dummyData;
  const { customerInfos = [] } = data;
  const columns = getColumns();
  const rows = getRows(customerInfos);

  if (false)
    // loading
    return (
      <div class="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
          {Object.keys(columns).map((keyName, index) => {
            return <th key={index}>{keyName.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((customer, index) => {
          return (
            <tr>
              <td>{index}</td>
              {Object.keys(customer).map((keyName, index) => {
                return <td key={index}>{customer[keyName] ?? "N/A"}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default InformationTable;
