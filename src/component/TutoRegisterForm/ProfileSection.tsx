/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import InputField from "../Shared/FormsharedFields/InpuField";
// import TextAreaField from "../Shared/FormsharedFields/TextAreaField";


const ProfileSection = ({ form, file, setFile }: any) => {
    return (
      <>
        <InputField name="name" label=" Name" required />
        <InputField name="email" label="Email" required type="email" />
        <InputField name="password" label="Password" required password />
        <InputField name="phone" label="Phone" />
       
        <Form.Item label="Profile Image">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            showUploadList={{ showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </>
    );
  };
  
  export default ProfileSection;