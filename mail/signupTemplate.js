export const SignUpTemplate = (name) => `<body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f6f8;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 18px rgba(16,24,40,0.08);">
            <!-- Header / Logo -->
            <tr>
              <td style="padding:24px;text-align:center;background:linear-gradient(90deg,#0ea5a4,#3b82f6);color:#ffffff;">
                <!-- Replace with <img src="..."> if you have a logo -->
                <h1 style="margin:0;font-size:20px;font-weight:700;">{{appName}}</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 32px 16px;color:#0f172a;">
                <p style="margin:0 0 12px;font-size:16px;">Hi <strong>${name}</strong>,</p>

                <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:#334155;">
                  Thanks for signing up in <strong>Walkie</strong> — we’re excited to have you on board!
                </p>

                <p style="margin:0 0 22px;font-size:15px;line-height:1.5;color:#334155;">
                  We will notify you soon 
                </p>

                
                <hr style="border:none;border-top:1px solid #eef2f7;margin:18px 0;">

                <p style="margin:0;font-size:13px;color:#64748b;line-height:1.4;">
                  If you didn't create an account with <strong>Walkie</strong>, you can safely ignore this email or contact us at
                  <a href="mailto:{{supportEmail}}" style="color:#2563eb;text-decoration:underline;">alamejaj288@gmail.com</a>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px;background:#f8fafc;color:#94a3b8;font-size:12px;text-align:center;">
                <p style="margin:0 0 6px;">© <span id="year">2025</span> {{appName}}. All rights reserved.</p>
                <p style="margin:0;">If you received this by mistake, please ignore it.</p>
              </td>
            </tr>
          </table>

          <!-- Small note -->
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="margin-top:12px;">
            <tr>
              <td style="text-align:center;color:#94a3b8;font-size:12px;">
                <p style="margin:0;">Need help? Email <a href="mailto:{{supportEmail}}" style="color:#2563eb;text-decoration:underline;">{{supportEmail}}</a></p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

    <!-- Optional: small script to set year for email preview tools that support JS (not necessary in most mail clients) -->
    <script>try{document.getElementById('year').innerText = new Date().getFullYear();}catch(e){}</script>
  </body>`