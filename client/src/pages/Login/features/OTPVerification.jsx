// OTPVerification.jsx
import { Form, Input } from "antd";
import { useEffect } from "react";

export const OTPVerification = ({ sharedProps, onComplete }) => {
  const form = Form.useFormInstance();

  const handleComplete = (otp) => {
    if (otp.length === 6) {
      onComplete?.();
      form.submit();
    }
  };

  return (
    <div className="col-span-2 flex justify-center items-center">
      <Form.Item
        label="Mã OTP"
        name="otp"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mã OTP!",
          },
        ]}
        className="mb-0 w-full max-w-[250px]"
      >
        <Input.OTP
          className="!w-full"
          formatter={(str) => str.toUpperCase()}
          length={6}
          onChange={(otp) => {
            sharedProps?.onChange?.(otp);
            handleComplete(otp);
          }}
          onInput={sharedProps?.onInput}
        />
      </Form.Item>
    </div>
  );
};
