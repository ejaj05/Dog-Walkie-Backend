const otpTemplate = (otpCode) => {
	return `
		<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Your OTP Code</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 18px rgba(16,24,40,0.08);">
            <!-- Header -->
            <tr>
              <td style="padding:24px;text-align:center;background:linear-gradient(90deg,#3b82f6,#0ea5a4);color:#ffffff;">
                <h1 style="margin:0;font-size:20px;font-weight:700;">Walkie</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px 16px;color:#0f172a;">

                <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#334155;">
                  Use the following One-Time Password (OTP) to complete your signup/login with <strong>Walkie</strong>.
                </p>

                <!-- OTP Code -->
                <div style="margin:24px 0;text-align:center;">
                  <span style="font-size:28px;letter-spacing:8px;font-weight:bold;color:#1e3a8a;background:#f1f5f9;padding:12px 20px;border-radius:6px;display:inline-block;">
                    ${otpCode}
                  </span>
                </div>

                <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#334155;">
                  This OTP will expire in <strong>10 minutes</strong>. Do not share it with anyone.
                </p>

                <hr style="border:none;border-top:1px solid #eef2f7;margin:22px 0;">

                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.4;">
                  If you didn’t request this OTP, please ignore this email or contact us at
                  <a href="mailto:{{supportEmail}}" style="color:#2563eb;text-decoration:underline;">alamejaj288@gmail.com</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                <p style="margin:0;">© <span id="year">2025</span> Walkie. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <script>try{document.getElementById('year').innerText = new Date().getFullYear();}catch(e){}</script>
  </body>
</html>

	`;
};
module.exports = {otpTemplate};