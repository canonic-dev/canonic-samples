import Table from "react-bootstrap/Table";

const dummyData = [
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
  {
    Name: "Simranjot",
    Email: "simranjot@canonic.dev",
    "Current Plan": "Enterprise",
    "Subscription Type": "Yearly",
    "Subscription Cycle": "2021-2022",
    "Total Purchase": "$1250",
  },
];

const InformationTable = () => {
  return (
    <div class="table-responsive">
      <Table class="table table-hove">
        <thead class="table-light">
          <tr>
            <th>#</th>
            {Array.from({ length: 8 }).map((_, index) => (
              <th key={index}>Table heading</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>2</td>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
          <tr>
            <td>3</td>
            {Array.from({ length: 8 }).map((_, index) => (
              <td key={index}>Table cell {index}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default InformationTable;
