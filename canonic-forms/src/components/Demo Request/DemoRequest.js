import { React, useState, useEffect } from "react";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/en/world.json";
import isMobilePhone from "validator/lib/isMobilePhone";
import UseGetDemo from "../../utils/apis/useGetDemo";
import {
  NOTIFICATION_DETAILS,
  FORM_PADDING,
} from "../../utils/constants/Constants";
import showNotification from "../../utils/views/showNotification";
import { Form, Input, Button, Typography, Spin } from "antd";

import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";

const DemoRequest = () => {
  const [form] = Form.useForm();
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(true);
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      return;
    }
    setLoading(true);
    const results = await UseGetDemo(nomalisePayload(values));
    setLoading(false);
    handleSubmission(results);
  };

  const handleSubmission = (result) => {
    if (result.error) {
      showNotification("error", NOTIFICATION_DETAILS.error);
    } else {
      showNotification("success", NOTIFICATION_DETAILS.success);
      form.resetFields();
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
          ...FORM_PADDING,
        }}
      >
        📹 Get a Demo!
      </Title>
      <Text
        type="secondary"
        style={{
          ...FORM_PADDING,
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
            ...FORM_PADDING,
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
