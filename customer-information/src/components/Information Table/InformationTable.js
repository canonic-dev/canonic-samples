import React from "react";
import { Table, Spinner } from "react-bootstrap";
import { GET_CUSTOMERS_INFO } from "../../gql/queries";
import { useQuery } from "@apollo/client";

const InformationTable = () => {
  const { data = {}, loading } = useQuery(GET_CUSTOMERS_INFO);
  const { customerInfos = [] } = data;
  const { customers = {} } = customerInfos[0] ?? {};
  const customerData = customers.data ?? [];

  if (loading)
    return (
      <div class="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div class="table-responsive">
      <Table class="table table-hove">
        <thead class="table-light">
          <tr>
            <th>#</th>
            {Object.keys(customerData[0] ?? {}).map((keyName, index) => {
              return <th key={index}>{keyName.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => {
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
    </div>
  );
};

export default InformationTable;

// const dummyData = [
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
//   {
//     Name: "Simranjot",
//     Email: "simranjot@canonic.dev",
//     "Current Plan": "Enterprise",
//     "Subscription Type": "Yearly",
//     "Subscription Cycle": "2021-2022",
//     "Total Purchase": "$1250",
//   },
// ];
