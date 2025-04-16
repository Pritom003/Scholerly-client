/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select, TimePicker, Button, FormInstance } from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import InputField from "../Shared/FormsharedFields/InpuField";
interface ExpectationSectionProps {
    form: FormInstance<any>;
  }
  
  const ExpectationSection: React.FC<ExpectationSectionProps> = ({ form }) => {
    return (
      <>
        <Form.Item name="subjects" label="Subjects" rules={[{ required: true }]}>
          <Select mode="tags" tokenSeparators={[","]} placeholder="Add subjects" />
        </Form.Item>
  
        <Form.List name="availability">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className="flex items-center gap-4 mb-4">
                  <Form.Item
                    {...restField}
                    name={[name, "day"]}
                    rules={[{ required: true, message: "Missing day" }]}
                  >
                    <Select placeholder="Day of the week">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                        <Select.Option key={day} value={day}>{day}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
  
                  <Form.Item
                    {...restField}
                    name={[name, "from"]}
                    rules={[{ required: true, message: "Missing start time" }]}
                  >
                    <TimePicker use12Hours format="h:mm A" />
                  </Form.Item>
  
                  <Form.Item
                    {...restField}
                    name={[name, "to"]}
                    rules={[{ required: true, message: "Missing end time" }]}
                  >
                    <TimePicker use12Hours format="h:mm A" />
                  </Form.Item>
  
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Availability Slot</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
  
        <InputField name="hourlyRate" label="Hourly Rate ($)" required type="number" />
        <InputField name="location" label="Location" placeholder="City or Address" />
      </>
    );
  };
  
  export default ExpectationSection;