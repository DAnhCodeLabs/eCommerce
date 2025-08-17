import React, { useState } from "react";
import { Divider, Form, message } from "antd";
import { httpPost } from "../../services/httpService";
import { useAuth } from "../../contexts/AuthContext";
import { assets } from "../../assets/assets";
import CustomForm from "../../components/commons/CustomForm";
import CommonButton from "../../components/commons/CommonButton";
const RegisterSeller = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const formItems = [
    {
      type: "text",
      name: "taxcode",
      label: "Tax Code (MST - CCCD)",
      placeholder: "Enter your tax code",
      rules: [{ required: true, message: "Please input your tax code!" }],
    },
    {
      type: "date",
      name: "dateOfIssue",
      label: "Date of Issue",
      placeholder: "Select date of issue",
      rules: [{ required: true, message: "Please select date of issue!" }],
    },
    {
      type: "date",
      name: "ExpirationDate",
      label: "Expiration Date",
      placeholder: "Select expiration date",
      rules: [{ required: true, message: "Please select expiration date!" }],
    },
    {
      type: "text",
      name: "PlaceOfGrant",
      label: "Place of Grant",
      placeholder: "Enter place of grant",
      rules: [{ required: true, message: "Please input place of grant!" }],
    },
    {
      type: "text",
      name: "shopName",
      label: "Shop Name",
      placeholder: "Enter your shop name",
      rules: [{ required: true, message: "Please input your shop name!" }],
    },
    {
      type: "text",
      name: "addressSeller",
      label: "Seller Address",
      placeholder: "Enter seller address",
      rules: [{ required: true, message: "Please input your address!" }],
    },
    {
      type: "text",
      name: "addressShop",
      label: "Shop Address",
      placeholder: "Enter shop address",
      rules: [{ required: true, message: "Please input shop address!" }],
    },
  ];
  const onFinish = async (values) => {
    try {
      const response = await httpPost("/user/register/seller", {
        taxcode: values.taxcode,
        dateOfIssue: values.dateOfIssue,
        ExpirationDate: values.ExpirationDate,
        PlaceOfGrant: values.PlaceOfGrant,
        shopName: values.shopName,
        addressSeller: values.addressSeller,
        addressShop: values.addressShop,
      });
      if (response.success) {
        message.success(response.message);
        form.resetFields();
        setTimeout(() => {
          logout();
          window.location.href = "/login";
        }, 1500);
      }
    } catch (error) {
      message.error(error.response?.message);
    }
  };
  return (
    <div className="w-[1400px] mx-auto my-10">
      <div className="flex justify-between items-center gap-4">
        <div className="w-2/3 border-1 border-[#e0dddd] rounded-xl p-4 flex flex-col gap-4">
          <div>
            <h1 className="text-secondary font-bold text-xl">
              Seller Application
            </h1>
            <p className="text-sm text-text-secondary mt-2">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its many desktop
              publishing packages and web page editors now use layout.
            </p>
            <Divider />
          </div>
          <div>
            <CustomForm
              form={form}
              formItems={formItems}
              onFinish={onFinish}
              submitButtonComponent={(props) => (
                <CommonButton
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                  className="!bg-secondary text-white hover:!bg-secondary/60"
                  {...props}
                >
                  Create Seller Account
                </CommonButton>
              )}
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-4">
          <div className="py-5 px-12 border-1 border-[#e0dddd] rounded-xl">
            <div className="flex flex-col items-center justify-center gap-2">
              <img className="w-[80px]" src={assets.saleOnline} alt="" />
              <h1 className="text-secondary font-extrabold text-2xl">
                Sell Your Product Online
              </h1>
              <p className="text-text-secondary text-sm text-center">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div className="py-5 px-12 border-1 border-[#e0dddd] rounded-xl">
            <div className="flex flex-col items-center justify-center gap-2">
              <img className="w-[80px]" src={assets.timelyPayment} alt="" />
              <h1 className="text-secondary font-extrabold text-2xl">
                Get Timely Your Payments
              </h1>
              <p className="text-text-secondary text-sm text-center">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
          <div className="py-5 px-12 border-1 border-[#e0dddd] rounded-xl">
            <div className="flex flex-col items-center justify-center gap-2">
              <img className="w-[80px]" src={assets.support} alt="" />
              <h1 className="text-secondary font-extrabold text-2xl">
                Support & Marketing Tools
              </h1>
              <p className="text-text-secondary text-sm text-center">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;
