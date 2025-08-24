// components/Banner/BannerFilters.jsx
import React from "react";
import { Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CommonButton from "../../../components/common/commons/CommonButton";
import InputField from "../../../components/common/commons/InputField";

const BannerFilters = ({ form, onFormChange, onReset }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={onFormChange}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <InputField
        name="search"
        label="Search"
        placeholder="Search by title, subtitle or description"
        suffix={<SearchOutlined />}
      />

      <InputField
        name="isActive"
        label="Status"
        type="select"
        options={[
          { value: true, label: "Active" },
          { value: false, label: "Inactive" },
        ]}
      />

      <InputField
        name="dateRange"
        label="Date Range"
        type="daterange"
        placeholder={["Start Date", "End Date"]}
      />

      <div className="flex items-center justify-end gap-2">
        <CommonButton onClick={onReset} className="w-full md:w-auto">
          Reset
        </CommonButton>
      </div>
    </Form>
  );
};

export default BannerFilters;
