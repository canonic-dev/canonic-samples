import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Typography, Spin } from "antd";
import UseContactUs from "../../utils/apis/useContactUs";
import {
  NOTIFICATION_DETAILS,
  FORM_PADDING,
} from "../../utils/constants/Constants";
import showNotification from "../../utils/views/showNotification";

const ContactForm = () => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(false);

  const onSubmit = React.useCallback(async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      return;
    }
    setLoading(true);
    const result = await UseContactUs(values);
    setLoading(false);
    handleSubmission(result);
  }, [form]);

  const handleSubmission = (result) => {
    if (result.error) {
      showNotification("error", NOTIFICATION_DETAILS.error);
    } else {
      showNotification("success", NOTIFICATION_DETAILS.success);
      form.resetFields();
    }
  };

  return (
    <div>
      <Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          ...FORM_PADDING,
        }}
      >
        ✉️ Contact Us!
      </Title>
      <Text type="secondary" style={{ ...FORM_PADDING }}>
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
            ...FORM_PADDING,
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
