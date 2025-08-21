// AuthForm.jsx
import { Form, Space, Checkbox } from "antd";
import { OTPVerification } from "./OTPVerification";
import { AuthFooter } from "./AuthFooter";
import CommonButton from "../../../components/commons/CommonButton";
import InputField from "../../../components/commons/InputField";

const AuthForm = ({
  state,
  form,
  onFinish,
  setState,
  sharedProps,
  purpose,
}) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="w-full">
      {state === "register" && (
        <>
          <InputField
            type="text"
            label={"Username"}
            name={"username"}
            required={true}
            rules={[
              {
                min: 3,
                message: "Username must be at least 3 characters.",
              },
              {
                max: 20,
                message: "Username cannot exceed 20 characters.",
              },
            ]}
          />
          <InputField
            type="text"
            label={"Phone Number"}
            name={"phone"}
            required={true}
            rules={[
              {
                pattern: /^\d{10,11}$/,
                message: "Số điện thoại phải có 10 hoặc 11 chữ số.",
              },
            ]}
          />
        </>
      )}

      {(state === "login" || state === "register" || state === "forgot") && (
        <InputField
          className="flex-1"
          label={"Email"}
          // rules={[
          //   // { type: "email", message: "Email không hợp lệ." },
          //   {
          //     min: 6,
          //     message: "Email phải có ít nhất 6 ký tự.",
          //   },
          //   {
          //     max: 50,
          //     message: "Email không được vượt quá 50 ký tự.",
          //   },
          // ]}
          name="email"
          required={true}
        />
      )}

      {(state === "login" || state === "register" || state === "reset") && (
        <InputField
          className="flex-1"
          label={state === "reset" ? "New Password" : "Password"}
          type="password"
          // rules={[
          //   {
          //     min: 6,
          //     message: "Mật khẩu phải có ít nhất 6 ký tự.",
          //   },
          //   {
          //     max: 50,
          //     message: "Mật khẩu không được vượt quá 50 ký tự.",
          //   },
          // ]}
          name="password"
          required={true}
        />
      )}

      {state === "verify" && (
        <OTPVerification
          sharedProps={sharedProps}
          onComplete={() => form.submit()}
        />
      )}

      {(state === "login" || state === "register") && (
        <Space className="w-full justify-between">
          {state === "login" && (
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember account</Checkbox>
            </Form.Item>
          )}
          <a
            href="#"
            className="text-secondary hover:underline"
            onClick={(e) => {
              e.preventDefault();
              setState("forgot");
            }}
          >
            Forgot password?
          </a>
        </Space>
      )}

      <Form.Item>
        <CommonButton
          type="primary"
          htmlType="submit"
          block
          className={
            "w-full mt-4 !rounded-lg !bg-secondary hover:!bg-tertiary duration-300 transition-all ease-in-out"
          }
        >
          {state === "login"
            ? "Sign in to your account"
            : state === "register"
            ? "Join us today"
            : state === "forgot"
            ? "Recover your account"
            : state === "reset"
            ? "Save your new password"
            : state === "verify"
            ? "Confirm your email to continue"
            : ""}
        </CommonButton>
      </Form.Item>

      <AuthFooter state={state} setState={setState} />
    </Form>
  );
};

export default AuthForm;
