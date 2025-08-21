// components/UserTable/UserStats.jsx
import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { UserOutlined, ShopOutlined } from "@ant-design/icons";

const UserStats = ({ stats }) => {
  return (
    <Row gutter={16} className="mb-4">
      <Col span={4}>
        <Card className="text-center">
          <Statistic
            title="Total Users"
            value={stats.total}
            prefix={<UserOutlined />}
            valueStyle={{ color: "#3f8600" }}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card className="text-center">
          <Statistic
            title="Regular Users"
            value={stats.users}
            valueStyle={{ color: "#1890ff" }}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card className="text-center">
          <Statistic
            title="Sellers"
            value={stats.sellers}
            prefix={<ShopOutlined />}
            valueStyle={{ color: "#722ed1" }}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card className="text-center">
          <Statistic
            title="Active"
            value={stats.active}
            valueStyle={{ color: "#52c41a" }}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card className="text-center">
          <Statistic
            title="Blocked"
            value={stats.blocked}
            valueStyle={{ color: "#cf1322" }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default UserStats;
