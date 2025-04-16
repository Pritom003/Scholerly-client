/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInstance } from "antd";
import TextAreaField from "../Shared/FormsharedFields/TextAreaField";

interface EducationSectionProps {
  form: FormInstance<any>;
}

const EducationSection: React.FC<EducationSectionProps> = ({ form }) => {
  return (
    <> <TextAreaField name="bio" label="Short Bio" rows={3} maxLength={1000} />
    <Form.List name="qualifications">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} className="border p-4 rounded-md mb-4 space-y-4">
              <div className="flex gap-4">
                <Form.Item
                  {...restField}
                  name={[name, "degree"]}
                  label="Degree"
                  rules={[{ required: true, message: "Please input the degree" }]}
                  className="w-full"
                >
                  <Input placeholder="e.g. BSc in Computer Science" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "institution"]}
                  label="Institution"
                  rules={[{ required: true, message: "Please input the institution" }]}
                  className="w-full"
                >
                  <Input placeholder="e.g. Harvard University" />
                </Form.Item>
              </div>

              <div className="flex gap-4">
                <Form.Item
                  {...restField}
                  name={[name, "graduationYear"]}
                  label="Graduation Year"
                  className="w-full"
                >
                  <Input type="number" placeholder="e.g. 2024 (optional)" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "currentYear"]}
                  label="Current Year (if not graduated)"
                  className="w-full"
                >
                  <Input placeholder="e.g. 3rd Year" />
                </Form.Item>
              </div>

              <Form.Item
                {...restField}
                name={[name, "experience"]}
                label="Experience (optional)"
              >
                <Input placeholder="e.g. 2 years tutoring at XYZ" />
              </Form.Item>

              <Button danger onClick={() => remove(name)} icon={<MinusCircleOutlined />}>Remove</Button>
            </div>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Qualification
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    
    </>
    
  );
};

export default EducationSection;