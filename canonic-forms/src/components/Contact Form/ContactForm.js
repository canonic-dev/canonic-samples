import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Spin, notification } from "antd";
import UseContactUs from "../../hooks/apis/useContactUs";

const ContactForm = () => {
  const [form] = Form.useForm();
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

  const onSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      await UseContactUs(values);
      setLoading(false);
      openNotificationWithIcon("success", notificationDetails.success);
      form.resetFields();
    } catch (errorInfo) {
      setLoading(false);
      openNotificationWithIcon("error", notificationDetails.error);
    }
  };

  const openNotificationWithIcon = (type, details) => {
    notification[type]({
      message: details.message,
      description: details.description,
    });
  };

  return (
    <div>
      <Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        ✉️ Contact Us!
      </Title>
      <Text
        type="secondary"
        style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Let us know how we can help you.
      </Text>
      <Spin spinning={loading}>
        <Form
          name="contact-us"
          layout="vertical"
          form={form}
          wrapperCol={{
            span: 6,
          }}
          style={{
            marginTop: 20,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
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
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Type your message here"
            name="message"
            required
            tooltip="This is a required field"
            rules={[
              {
                required: true,
                message: "Message is a required field!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Message ..."
              autoSize={{ minRows: 4, maxRows: 6 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ContactForm;
