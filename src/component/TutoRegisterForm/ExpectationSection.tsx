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

      {/* Ensure at least one availability slot is visible */}
      <Form.List
        name="availability"
        initialValue={[{}]} 
         rules={[
           {
             validator: async (_, value) => {
               if (!value || value.length === 0) {
                 return Promise.reject(new Error("At least one availability slot is required"));
               }
               return Promise.resolve();
             },
           },
         ]}
        // Initialize with one empty availability slot
      >
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
                      <Select.Option key={day} value={day}>
                        {day}
                      </Select.Option>
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
            {/* Add button visible if more slots are desired */}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Availability Slot
              </Button>
              <span className="text-xs text-amber-900">
  Please specify the days and times you are available for tutoring (required).
</span>
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
