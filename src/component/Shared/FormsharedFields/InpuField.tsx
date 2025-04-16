/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";

const InputField = ({ name, label, required = false, type = "text", password = false, placeholder = "" }: any) => (
  <Form.Item
    name={name}
    label={label}
    rules={required ? [{ required: true, message: `${label} is required` }] : []}
  >
    {password ? <Input.Password placeholder={placeholder} /> : <Input type={type} placeholder={placeholder} />}
  </Form.Item>
);

export default InputField;