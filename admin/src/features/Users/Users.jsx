// pages/Users.jsx
import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import BreadcrumbHeader from "../../components/BreadcrumbHeader";
import {
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from "../../services/httpService";
import UserStats from "./components/UserStats";
import UserFilters from "./components/UserFilters";
import UserTable from "./components/UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    isBlocked: "",
    emailVerified: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    users: 0,
    sellers: 0,
    active: 0,
    blocked: 0,
  });

  const buildQueryParams = (params) => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });

    return queryParams.toString();
  };

  const fetchUsers = async (pageParams = {}) => {
    setLoading(true);
    try {
      const queryParams = buildQueryParams({
        page: pageParams.current || pagination.current,
        limit: pageParams.pageSize || pagination.pageSize,
        search: filters.search,
        role: filters.role,
        isBlocked: filters.isBlocked,
        emailVerified: filters.emailVerified,
      });

      console.log("Fetching users with params:", queryParams);

      const response = await httpGet(`/admin/users?${queryParams}`);

      if (response.success) {
        setUsers(response.users);
        setPagination({
          current: response.page,
          pageSize: response.limit,
          total: response.total,
        });
        calculateStats(response.users);
      } else {
        message.error(response.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (usersData) => {
    const total = usersData.length;
    const users = usersData.filter((u) => u.role === "user").length;
    const sellers = usersData.filter((u) => u.role === "seller").length;
    const active = usersData.filter((u) => !u.isBlocked).length;
    const blocked = usersData.filter((u) => u.isBlocked).length;

    setStats({ total, users, sellers, active, blocked });
  };

  useEffect(() => {
    fetchUsers({ current: 1 });
  }, [filters]);

  const handleTableChange = (newPagination, filters, sorter) => {
    fetchUsers({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      role: "",
      isBlocked: "",
      emailVerified: "",
    });
    // Reset và fetch lại ngay lập tức
    setTimeout(() => {
      fetchUsers({ current: 1 });
    }, 0);
  };

  const handleApplyFilters = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleViewUser = (user) => {
    Modal.info({
      title: "User Details",
      width: 700,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone || "-"}
            </div>
            <div>
              <strong>Role:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  user.role === "seller"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  user.isBlocked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
            <div>
              <strong>Email Verified:</strong>{" "}
              {user.emailVerified ? "Yes" : "No"}
            </div>
            <div>
              <strong>Created:</strong>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Updated:</strong>{" "}
              {new Date(user.updatedAt).toLocaleString()}
            </div>
          </div>

          {user.sellerInfo && (
            <div className="mt-4 p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Seller Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <strong>Shop Name:</strong> {user.sellerInfo.shopName}
                </div>
                <div>
                  <strong>Tax Code:</strong> {user.sellerInfo.taxcode}
                </div>
                <div>
                  <strong>Place of Grant:</strong>{" "}
                  {user.sellerInfo.PlaceOfGrant}
                </div>
                <div>
                  <strong>Date of Issue:</strong>{" "}
                  {new Date(user.sellerInfo.dateOfIssue).toLocaleDateString()}
                </div>
                <div>
                  <strong>Expiration Date:</strong>{" "}
                  {new Date(
                    user.sellerInfo.ExpirationDate
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    });
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      const response = await httpDelete(`/admin/delete-user/${id}`);
      if (response.success) {
        message.success(response.message);
        fetchUsers({ current: pagination.current });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        message.error(error.response.data.message);
      }
    }
  };

  const handleToggleBlock = async (user) => {
    try {
      const action = user.isBlocked ? "unblock-user" : "block-user";

      const response = await httpPatch(`/admin/${action}/${user._id}`);

      if (response.success) {
        message.success(response.message);
        // Refresh the user list
        fetchUsers({
          current: pagination.current,
          pageSize: pagination.pageSize,
        });
      } else {
        message.error(response.message);
        throw new Error(response.message);
      }
    } catch (error) {
      console.error(
        `Error ${user.isBlocked ? "unblocking" : "blocking"} user:`,
        error
      );

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          `Failed to ${
            user.isBlocked ? "unblock" : "block"
          } user. Please try again.`
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Users Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Users" },
          ]}
        />
      </div>

      <UserStats stats={stats} />

      <div className="bg-white rounded-xl p-6">
        <UserFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
        />

        <UserTable
          users={users}
          loading={loading}
          pagination={pagination}
          onTableChange={handleTableChange}
          onView={handleViewUser}
          onDelete={handleDeleteUser}
          onToggleBlock={handleToggleBlock}
        />
      </div>
    </div>
  );
};

export default Users;
