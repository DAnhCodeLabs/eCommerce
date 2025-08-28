import React, { useState, useEffect } from "react";
import { Tree, Card, Spin, message, Row, Col, Modal, Dropdown } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  FolderOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import InputField from "../../../components/common/commons/InputField";
import CommonButton from "../../../components/common/commons/CommonButton";
import { httpGet, httpDelete } from "../../../services/httpService";

const CategoriesTree = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [searchParams, setSearchParams] = useState({
    search: "",
    isActive: "",
    isEnabled: "",
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "asc",
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key]) {
          params.append(key, searchParams[key]);
        }
      });

      const response = await httpGet(
        `/admin/categories-tree?${params.toString()}`
      );

      if (response.success) {
        const treeData = transformToTreeData(response.categories);
        setCategories(treeData);
      } else {
        message.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const transformToTreeData = (categories) => {
    return categories.map((category) => ({
      key: category._id,
      title: (
        <TreeNodeContent
          category={category}
          onView={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isParent={true}
        />
      ),
      icon: ({ expanded }) =>
        expanded ? (
          <FolderOpenOutlined className="text-blue-500" />
        ) : (
          <FolderOutlined className="text-blue-400" />
        ),
      children: category.children.map((child) => ({
        key: child._id,
        title: (
          <TreeNodeContent
            category={child}
            onView={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isParent={false}
          />
        ),
        icon: <FolderOutlined className="text-gray-500" />,
        isLeaf: true,
      })),
    }));
  };

  const TreeNodeContent = ({
    category,
    onView,
    onEdit,
    onDelete,
    isParent,
  }) => {
    return (
      <div className="flex items-center justify-between w-full category-node py-2 px-1 hover:bg-gray-50 rounded-md">
        <div className="flex items-center truncate">
          <span
            className={`font-medium ${
              isParent ? "text-gray-800" : "text-gray-700"
            } truncate`}
          >
            {category.name}
          </span>
          <div className="flex gap-2 ml-3">
            <span
              className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                category.isActive
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {category.isActive ? "Active" : "Inactive"}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                category.isEnabled
                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {category.isEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 node-actions">
          <CommonButton
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(category)}
            className="text-blue-500 hover:text-blue-700 hover:bg-blue-100"
            size="small"
            title="View details"
          />
          <CommonButton
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(category)}
            className="text-green-500 hover:text-green-700 hover:bg-green-100"
            size="small"
            title="Edit category"
          />
          <CommonButton
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(category)}
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
            size="small"
            title="Delete category"
          />
        </div>
      </div>
    );
  };

  const handleViewDetails = (category) => {
    setSelectedCategory(category);
    setDetailModalVisible(true);
  };

  const handleEdit = (category) => {
    message.info(`Edit functionality for: ${category.name}`);
    // Implement edit functionality here
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await httpDelete(
        `/admin/categories/${selectedCategory._id}`
      );
      if (response.success) {
        message.success("Category deleted successfully");
        fetchCategories();
      } else {
        message.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      message.error("Error deleting category");
    } finally {
      setDeleteConfirmVisible(false);
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchParams]);

  const handleReset = () => {
    setSearchParams({
      search: "",
      isActive: "",
      isEnabled: "",
      page: 1,
      limit: 10,
      sortBy: "name",
      sortOrder: "asc",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Card
        title={
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-800">
              Categories Tree
            </span>
            <CommonButton
              icon={<ReloadOutlined />}
              onClick={fetchCategories}
              className="ml-3"
              type="default"
              size="small"
            >
              Refresh
            </CommonButton>
          </div>
        }
        className="shadow-md rounded-lg overflow-hidden border-0"
        extra={
          <CommonButton
            type="primary"
            size="middle"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add New Category
          </CommonButton>
        }
      >
        {/* Search Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <InputField
                name="search"
                placeholder="Search categories..."
                value={searchParams.search}
                onChange={(e) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                suffix={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={24} md={6}>
              <InputField
                name="isActive"
                type="select"
                placeholder="Active status"
                value={searchParams.isActive}
                onChange={(value) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    isActive: value,
                  }))
                }
                options={[
                  { value: "", label: "All Status" },
                  { value: "true", label: "Active" },
                  { value: "false", label: "Inactive" },
                ]}
                size="large"
              />
            </Col>
            <Col xs={24} md={6}>
              <InputField
                name="isEnabled"
                type="select"
                placeholder="Enabled status"
                value={searchParams.isEnabled}
                onChange={(value) =>
                  setSearchParams((prev) => ({
                    ...prev,
                    isEnabled: value,
                  }))
                }
                options={[
                  { value: "", label: "All Status" },
                  { value: "true", label: "Enabled" },
                  { value: "false", label: "Disabled" },
                ]}
                size="large"
              />
            </Col>
            <Col xs={24} md={4} className="flex items-end">
              <div className="flex gap-2 w-full">
                <CommonButton
                  icon="reload"
                  onClick={handleReset}
                  className="flex-1"
                  size="large"
                >
                  Reset
                </CommonButton>
              </div>
            </Col>
          </Row>
        </div>

        {/* Categories Tree */}
        <Spin spinning={loading}>
          {categories.length > 0 ? (
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <Tree
                treeData={categories}
                defaultExpandAll
                showIcon
                className="categories-tree full-width-tree"
                switcherIcon={<div className="text-gray-500 text-lg">›</div>}
                blockNode={true}
              />
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="text-lg mb-2">No categories found</div>
              <div className="text-sm">
                Try adjusting your search criteria or add a new category
              </div>
            </div>
          )}
        </Spin>

        {/* Pagination Controls */}
        {categories.length > 0 && (
          <div className="flex justify-between items-center mt-6 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              Showing {categories.length} categories
            </span>
            <div className="flex gap-2">
              <CommonButton
                disabled={searchParams.page === 1}
                onClick={() =>
                  setSearchParams((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                type="default"
              >
                Previous
              </CommonButton>
              <CommonButton
                onClick={() =>
                  setSearchParams((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }))
                }
                type="primary"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </CommonButton>
            </div>
          </div>
        )}
      </Card>

      {/* Category Detail Modal */}
      <Modal
        title="Category Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <CommonButton
            key="close"
            onClick={() => setDetailModalVisible(false)}
          >
            Close
          </CommonButton>,
          <CommonButton
            key="edit"
            type="primary"
            onClick={() => {
              setDetailModalVisible(false);
              handleEdit(selectedCategory);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit
          </CommonButton>,
        ]}
        width={600}
      >
        {selectedCategory && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-semibold text-gray-700">Name:</div>
              <div className="text-gray-900">{selectedCategory.name}</div>

              <div className="font-semibold text-gray-700">Status:</div>
              <div>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ${
                    selectedCategory.isActive
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {selectedCategory.isActive ? "Active" : "Inactive"}
                </span>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs ml-2 ${
                    selectedCategory.isEnabled
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {selectedCategory.isEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="font-semibold text-gray-700">Created At:</div>
              <div className="text-gray-900">
                {new Date(selectedCategory.createdAt).toLocaleDateString()}
              </div>

              <div className="font-semibold text-gray-700">Updated At:</div>
              <div className="text-gray-900">
                {new Date(selectedCategory.updatedAt).toLocaleDateString()}
              </div>

              {selectedCategory.description && (
                <>
                  <div className="font-semibold text-gray-700">
                    Description:
                  </div>
                  <div className="text-gray-900 col-span-1">
                    {selectedCategory.description}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteConfirmVisible}
        onCancel={() => setDeleteConfirmVisible(false)}
        footer={[
          <CommonButton
            key="cancel"
            onClick={() => setDeleteConfirmVisible(false)}
          >
            Cancel
          </CommonButton>,
          <CommonButton
            key="delete"
            type="primary"
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </CommonButton>,
        ]}
      >
        <p>
          Are you sure you want to delete the category "{selectedCategory?.name}
          "?
        </p>
        <p className="text-red-500 mt-2">This action cannot be undone.</p>
      </Modal>

      <style jsx>{`
        :global(.full-width-tree .ant-tree-treenode) {
          width: 100%;
          display: flex;
          padding: 4px 0;
        }

        :global(.full-width-tree .ant-tree-node-content-wrapper) {
          flex: 1;
          display: flex;
          align-items: center;
        }

        :global(.full-width-tree .ant-tree-title) {
          flex: 1;
        }

        :global(.category-node) {
          transition: all 0.3s ease;
        }

        :global(.category-node:hover) {
          background-color: #f3f4f6;
        }

        :global(.node-actions) {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        :global(.category-node:hover .node-actions) {
          opacity: 1;
        }

        :global(.ant-tree .ant-tree-treenode) {
          padding: 2px 0;
        }

        :global(.ant-tree .ant-tree-node-content-wrapper) {
          min-height: 36px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default CategoriesTree;
