export const otpEmailTemplate = (otp) => {
  return `
     <div
      style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, sans-serif;
      "
    >
      <div
        style="
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          overflow: hidden;
        "
      >
        <!-- Simplified Header -->
        <div
          style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 25px 30px;
            text-align: center;
            position: relative;
          "
        >
          <div style="position: relative; z-index: 2">
            <h1
              style="
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                color: #ffffff;
                letter-spacing: 2px;
              "
            >
              ZENMART
            </h1>
            <p
              style="
                margin: 5px 0 0 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
              "
            >
              SECURE VERIFICATION SYSTEM
            </p>
          </div>
        </div>

        <!-- OTP Section - Moved up and made more prominent -->
        <div style="padding: 30px; text-align: center; background: #ffffff">
          <div
            style="
              background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
              border: 2px solid #e2e8f0;
              border-radius: 16px;
              padding: 20px;
              margin: 10px 0;
            "
          >
            <p
              style="
                margin: 0 0 10px 0;
                font-size: 14px;
                font-weight: 600;
                color: #718096;
              "
            >
              MÃ XÁC THỰC CỦA BẠN
            </p>
            <div
              style="
                font-size: 36px;
                font-weight: 800;
                color: #667eea;
                letter-spacing: 8px;
                margin: 10px 0;
              "
            >
              ${otp}
            </div>
            <div
              style="
                display: inline-flex;
                align-items: center;
                background: #fed7d7;
                border-radius: 20px;
                padding: 6px 12px;
                margin-top: 10px;
              "
            >
              <div
                style="
                  width: 6px;
                  height: 6px;
                  background: #e53e3e;
                  border-radius: 50%;
                  margin-right: 6px;
                "
              ></div>
              <span style="font-size: 12px; font-weight: 600; color: #c53030"
                >Hết hạn sau 5 phút</span
              >
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div style="padding: 0 30px 30px 30px; color: #2d3748">
          <p
            style="
              font-size: 16px;
              line-height: 1.6;
              margin: 0 0 15px 0;
              color: #4a5568;
            "
          >
            Xin chào,
          </p>
          <p
            style="font-size: 16px; line-height: 1.6; margin: 0; color: #4a5568"
          >
            Chúng tôi đã nhận được yêu cầu xác thực email của bạn.
          </p>

          <!-- Security Notice -->
          <div
            style="
              background: #fff7ed;
              border-left: 4px solid #f6ad55;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
            "
          >
            <div style="display: flex; align-items: center">
              <div
                style="
                  background: #f6ad55;
                  color: white;
                  border-radius: 50%;
                  width: 20px;
                  height: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 10px;
                "
              >
                !
              </div>
              <div>
                <p style="margin: 0; font-size: 13px; color: #9c4221">
                  Không chia sẻ mã này với bất kỳ ai để đảm bảo an toàn tài
                  khoản.
                </p>
              </div>
            </div>
          </div>

          <!-- Signature -->
          <div style="margin-top: 25px">
            <p style="margin: 0; font-size: 16px; color: #4a5568">
              Trân trọng,
            </p>
            <p
              style="
                margin: 5px 0 0 0;
                font-size: 16px;
                font-weight: 600;
                color: #2d3748;
              "
            >
              Đội ngũ Bảo mật Zenmart
            </p>
          </div>
        </div>

        <!-- Simplified Footer -->
        <div
          style="
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          "
        >
          <p style="margin: 0; font-size: 12px; color: #a0aec0">
            © 2025 Zenmart Technology. All rights reserved.<br />
            <span style="font-size: 11px">Bảo mật SSL 256-bit</span>
          </p>
        </div>
      </div>
    </div>
  `;
};
