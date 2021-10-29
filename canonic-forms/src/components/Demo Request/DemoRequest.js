import { React, useState, useEffect } from "react";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import isMobilePhone from "validator/lib/isMobilePhone";
import UseGetDemo from "../../hooks/apis/useGetDemo";
import { Form, Input, Button, Typography, Spin, notification } from "antd";

import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";

const DemoRequest = () => {
  const [form] = Form.useForm();
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

  const notificationDetails = {
    success: {
      message: "Details Submitted!",
      description:
        "We've got your information. Our team will get in touch you shortly!",
    },
    error: {
      message: "Something went wrong!",
      description: "Please try again later or email us to support@canonic.dev!",
    },
  };

  const onPhoneNumberChange = (e) => {
    var valid = isMobilePhone("+" + e.code + e.phone);
    setCheckPhoneNumber(valid);
    return valid;
  };

  const nomalisePayload = (payload) => {
    return {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      company: payload.company,
      phone: {
        code: payload.lowerCase.code,
        country: payload.lowerCase.short,
        number: payload.lowerCase.phone,
      },
    };
  };

  const openNotificationWithIcon = (type, details) => {
    notification[type]({
      message: details.message,
      description: details.description,
    });
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await UseGetDemo(nomalisePayload(values));
      setLoading(false);
      openNotificationWithIcon("success", notificationDetails.success);
      form.resetFields();
    } catch (errorInfo) {
      setLoading(false);
      openNotificationWithIcon("error", notificationDetails.error);
    }
  };

  useEffect(() => {
    form.validateFields(["lowercase"]);
  }, [checkPhoneNumber, form]);

  return (
    <ConfigProvider locale={en}>
      <Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        📹 Get a Demo!
      </Title>
      <Text
        type="secondary"
        style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        A quick 30 mins session of the platform.
      </Text>
      <Spin spinning={loading}>
        <Form
          name="get-a-demo"
          form={form}
          layout="vertical"
          wrapperCol={{
            span: 6,
          }}
          style={{
            marginTop: 20,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
          }}
          initialValues={{
            lowerCase: {
              short: "us",
            },
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            required
            tooltip="This is a required field"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input placeholder="Work Email" />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Please enter your company name!",
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="lowerCase"
            tooltip="This is a required field"
            required
            rules={[
              {
                validator: (_, value) =>
                  onPhoneNumberChange(value)
                    ? Promise.resolve()
                    : Promise.reject(new Error("Enter a valid phone number!")),
              },
            ]}
          >
            <CountryPhoneInput onChange={onPhoneNumberChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              Get a Demo
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </ConfigProvider>
  );
};

export default DemoRequest;
