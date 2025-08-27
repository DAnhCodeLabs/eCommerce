import React from "react";
import BreadcrumbHeader from "../../components/BreadcrumbHeader";
import CommonButton from "../../components/common/commons/CommonButton";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Categories Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Categories" },
          ]}
        />
      </div>
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Banner List</h3>
          <div className="flex gap-2">
            <CommonButton type="primary">
              <Link to={"/admin/add-category?type=category"}>Add Category</Link>
            </CommonButton>
            <CommonButton type="primary">
              <Link to={"/admin/add-category?type=subcategory"}>
                Add Subcategory
              </Link>
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
