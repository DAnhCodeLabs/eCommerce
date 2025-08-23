// src/components/CustomForm.jsx
import React from "react";
import { Form, Row, Col } from "antd";
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
  layout = "vertical", // "vertical" | "horizontal" | "inline"
  ...formProps
}) => {
  const buttonsJustify = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  }[buttonsLayout];

  // Phân loại form items theo colSpan
  const renderFormItems = () => {
    const rows = [];
    let currentRow = [];

    formItems.forEach((item, index) => {
      const colSpan = item.colSpan || 24; // Mặc định 24 (full width)

      if (currentRow.length > 0) {
        const currentRowSpan = currentRow.reduce(
          (sum, i) => sum + (i.colSpan || 24),
          0
        );

        // Nếu thêm item này vượt quá 24 (1 row) thì tạo row mới
        if (currentRowSpan + colSpan > 24) {
          rows.push(currentRow);
          currentRow = [item];
        } else {
          currentRow.push(item);
        }
      } else {
        currentRow.push(item);
      }

      // Nếu là item cuối cùng, thêm currentRow vào rows
      if (index === formItems.length - 1 && currentRow.length > 0) {
        rows.push(currentRow);
      }
    });

    return rows.map((rowItems, rowIndex) => (
      <Row key={rowIndex} gutter={16}>
        {rowItems.map((item) => (
          <Col
            key={item.name}
            span={item.colSpan || (rowItems.length === 1 ? 24 : 12)}
          >
            <InputField {...item} />
          </Col>
        ))}
      </Row>
    ));
  };

  return (
    <Form
      {...formProps}
      layout={layout}
      className="space-y-4"
      onFinish={onFinish}
    >
      {renderFormItems()}

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
