import React from "react";
import BreadcrumbHeader from "../../components/BreadcrumbHeader";
import CommonButton from "../../components/common/commons/CommonButton";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Banner Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Banner" },
          ]}
        />
      </div>
      <div className="bg-white rounded-xl p-6">
        <CommonButton>
          <Link to={"/admin/add-banner"}>Add Banner</Link>
        </CommonButton>
      </div>
    </div>
  );
};

export default Banner;
