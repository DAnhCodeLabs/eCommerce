// src/components/CustomForm.jsx
import React from "react";
import { Form } from "antd";
import InputField from "./InputField";

const CustomForm = ({
  formItems,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  onFinish,
  onCancel,
  loading,
  submitButtonComponent: SubmitButton = (props) => <button {...props} />,
  cancelButtonComponent: CancelButton = (props) => <button {...props} />,
  buttonsLayout = "start", // "start" | "center" | "end"
  ...formProps
}) => {
  const buttonsJustify = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }[buttonsLayout];

  return (
    <Form
      {...formProps}
      layout="vertical"
      className="space-y-4"
      onFinish={onFinish}
    >
      {formItems.map((item) => (
        <InputField key={item.name} {...item} />
      ))}
      {children && <div className="mt-6">{children}</div>}

      {(onFinish || onCancel) && (
        <div className={`flex space-x-4 mt-6 ${buttonsJustify}`}>
          {onCancel && (
            <CancelButton onClick={onCancel} disabled={loading}>
              {cancelText}
            </CancelButton>
          )}
          {onFinish && (
            <SubmitButton loading={loading} disabled={loading}>
              {submitText}
            </SubmitButton>
          )}
        </div>
      )}
    </Form>
  );
};

export default CustomForm;
