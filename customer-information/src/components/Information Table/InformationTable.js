import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { GET_CUSTOMERS_INFO } from "../../gql/queries";
import { useQuery } from "@apollo/client";

import { dummyData } from "../../DummyData";
import { getColumns, getRows } from "../../utils/normaliseTableData";

const InformationTable = () => {
  const { data = {}, loading } = useQuery(GET_CUSTOMERS_INFO);
  // const data = dummyData;
  const { customers = [] } = data;
  const columns = getColumns();
  const rows = getRows(customers);

  if (loading)
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Table responsive hover bordered>
      <thead>
        <tr>
          <th class="align-middle">#</th>
          {Object.keys(columns).map((keyName) => {
            return (
              <th class="text-center align-middle" key={keyName}>
                <div>{keyName.toUpperCase()}</div>
                {columns[keyName] === "Stripe" ? (
                  <span class="badge bg-primary ml-5">{columns[keyName]}</span>
                ) : (
                  <span class="badge bg-warning text-dark ml-5">
                    {columns[keyName]}
                  </span>
                )}
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
