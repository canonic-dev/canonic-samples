// Import React and Bootstrap dependencies
import React from "react";
import { Table, Spinner } from "react-bootstrap";

// Import our util functions
import { getColumns, getRows } from "../../utils/normaliseTableData";

// Dummy Data Source
import { dummyData } from "../../dummyData";

// Import Quering dependencies
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS_INFO } from "../../gql/queries";

const InformationTable = () => {
  const { data = {}, loading } = useQuery(GET_CUSTOMERS_INFO);
  const { customers = [] } = data;
  const columns = getColumns();
  const rows = getRows(customers);

  /* Getting class names according to the data source */
  const className = (key) => {
    return key === "Stripe" ? "bg-primary" : "bg-warning text-dark";
  };

  /* Show loading indicator is the API call is in progress */
  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );

  return (
    /* Bootstraps Table Component */
    <Table responsive hover bordered>
      <thead>
        <tr>
          <th class="align-middle">#</th>
          {/* Mapping over the columns and setting them up */}
          {Object.keys(columns).map((keyName) => {
            return (
              <th class="text-center align-middle" key={keyName}>
                <div>{keyName.toUpperCase()}</div>
                {/* Showing a bagde to see from where the data came from */}
                <span className={`badge ml-5 ${className(columns[keyName])}`}>
                  {columns[keyName]}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {rows.map((customer, index) => {
          return (
            <tr key={index}>
              <td class="align-middle fw-bolder font-monospace">{index}</td>
              {/* Mapping over the rows and setting them up */}
              {Object.keys(customer).map((keyName, index) => {
                return (
                  <td class="col-2 align-middle text-center " key={index}>
                    {customer[keyName] ?? "N/A"}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default InformationTable;
