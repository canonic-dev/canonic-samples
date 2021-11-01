import React, { useState } from "react";
import "./App.css";

import { Layout, Menu } from "antd";

import ContactForm from "./components/Contact Form";
import DemoRequest from "./components/Demo Request/DemoRequest";

const { Header, Content, Footer } = Layout;

const App = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleNavigation = (activeTab) => {
    setActiveTab(activeTab);
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["contactUs"]}
        >
          <Menu.Item
            key="contactUs"
            style={{ color: "#ffffff" }}
            onClick={() => handleNavigation(0)}
          >
            Contact Us
          </Menu.Item>
          <Menu.Item
            key="getADemo"
            style={{ color: "#ffffff" }}
            onClick={() => handleNavigation(1)}
          >
            Get a Demo
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          marginTop: 64,
          padding: 20,
          paddingBottom: 0,
        }}
      >
        <div className="site-layout-background">
          {activeTab ? (
            <DemoRequest></DemoRequest>
          ) : (
            <ContactForm></ContactForm>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center", backgroundColor: "fff" }}>
        Canonic ©2021 Created by Canonic Inc
      </Footer>
    </Layout>
  );
};

export default App;
