// components/UserTable/UserFilters.jsx
import React from "react";
import { Card } from "antd";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import InputField from "../../../components/common/commons/InputField";
import SelectField from "../../../components/common/commons/SelectField";
import CommonButton from "../../../components/common/commons/CommonButton";

const UserFilters = ({ filters, onFilterChange, onReset, onApply }) => {
  const handleInputChange = (key, value) => {
    onFilterChange(key, value);
  };

  const handleSelectChange = (key, value) => {
    onFilterChange(key, value);
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <Card className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <InputField
            type="text"
            placeholder="Search username, email, phone..."
            prefix={<SearchOutlined />}
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            allowClear
            className="!m-0"
          />
        </div>

        <div>
          <SelectField
            placeholder="Filter by Role"
            value={filters.role}
            onChange={(value) => handleSelectChange("role", value)}
            allowClear
            options={[
              { label: "User", value: "user" },
              { label: "Seller", value: "seller" },
            ]}
            className="!m-0 w-full"
          />
        </div>

        <div>
          <SelectField
            placeholder="Filter by Status"
            value={filters.isBlocked}
            onChange={(value) => handleSelectChange("isBlocked", value)}
            allowClear
            options={[
              { label: "Active", value: "false" },
              { label: "Blocked", value: "true" },
            ]}
            className="!m-0 w-full"
          />
        </div>

        <div>
          <SelectField
            placeholder="Email Verified"
            value={filters.emailVerified}
            onChange={(value) => handleSelectChange("emailVerified", value)}
            allowClear
            options={[
              { label: "Verified", value: "true" },
              { label: "Not Verified", value: "false" },
            ]}
            className="!m-0 w-full"
          />
        </div>

        <div className="flex gap-2">
          <CommonButton
            icon={<ReloadOutlined />}
            onClick={handleReset}
            className="flex-1"
          >
            Reset
          </CommonButton>
          <CommonButton type="primary" onClick={onApply} className="flex-1">
            Apply
          </CommonButton>
        </div>
      </div>
    </Card>
  );
};

export default UserFilters;
