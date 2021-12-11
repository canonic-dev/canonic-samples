import "./App.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import { Navbar, Alignment, Divider, Spinner } from "@blueprintjs/core";

import Twitter from "./components/Twitter";
import Youtube from "./components/Youtube";

import { useQuery } from "@apollo/client";
import { GET_MARKETING_METRICS } from "./gql/query";

import { dummyData } from "./dummyData";

const App = () => {
  const { data = {}, loading } = useQuery(GET_MARKETING_METRICS);
  const { metric = {} } = data.metric ? data : dummyData;

  if (loading)
    return (
      <div style={{ margin: "200px" }}>
        <Spinner></Spinner>
      </div>
    );

  return (
    <div className="App">
      <Navbar className="bp3-dark" style={{ position: "fixed", top: "0" }}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading style={{ marginLeft: "30px" }}>
            Marketing Dashboard
          </Navbar.Heading>
        </Navbar.Group>
      </Navbar>
      <div
        style={{ marginLeft: "30px", marginTop: "80px", marginRight: "30px" }}
      >
        <div style={{ marginTop: "50px" }}>
          <Youtube
            youtubeMetrics={metric.youtubeMetrics}
            youtubeMinutesDay={metric.youtubeMinutesDay}
            youtubeMinutesCountry={metric.youtubeMinutesCountry}
          ></Youtube>
        </div>
        <Divider style={{ marginTop: "50px" }}></Divider>
        <div style={{ marginTop: "50px" }}>
          <Twitter twitter={metric.twitter.data}></Twitter>
        </div>
        <Divider style={{ marginTop: "50px" }}></Divider>
      </div>
      <div>
        <h5
          style={{
            fontSize: "medium",
            textAlign: " left",
            margin: "30px 30px 20px 30px",
          }}
        >
          Canonic ©2021 Created by Canonic Inc
        </h5>
      </div>
    </div>
  );
};

export default App;
