/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input } from "antd";
const { TextArea } = Input;

const TextAreaField = ({ name, label, rows = 4, maxLength = 1000 }: any) => (
  <Form.Item name={name} label={label}>
    <TextArea rows={rows} maxLength={maxLength} />
  </Form.Item>
);

export default TextAreaField;