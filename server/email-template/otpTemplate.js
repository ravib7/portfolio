exports.otpTemplate = ({ name, otp, min, sec }) => {

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Admin Login OTP</title>
</head>

<body style="margin:0;padding:30px;background:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<div style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;
box-shadow:0px 4px 15px rgba(0,0,0,0.15);">

    <!-- Header -->
    <div style="background:#38bdf8;padding:30px;text-align:center;color:white;">
        <h1 style="margin:0;font-size:26px;">Admin Login Verification</h1>
        <p style="margin-top:8px;font-size:18px;">Secure Admin Access Code</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">

        <p style="font-size:18px;color:#333;">
            Hello <strong>${name}</strong>,
        </p>

        <p style="font-size:16px;color:#555;">
            Use the following One-Time Password (OTP) to securely login to your admin dashboard.
        </p>

        <!-- OTP Box -->
        <div style="
            background:#e0f7ff;
            border-left:6px solid #38bdf8;
            padding:25px;
            margin-top:25px;
            border-radius:10px;
            text-align:center;
            box-shadow:0px 2px 10px rgba(0,0,0,0.08);">

            <h1 style="font-size:40px;letter-spacing:6px;margin:0;color:#0f172a;">
                ${otp}
            </h1>

            <p style="margin-top:15px;font-size:15px;color:#555;">
                This OTP will expire in ${min} minutes (${sec} seconds)
            </p>

        </div>

        <p style="font-size:15px;margin-top:25px;color:#555;">
            If you did not request this login attempt, you can safely ignore this email.
        </p>

        <p style="font-size:16px;margin-top:30px;line-height:24px;">
            Regards,<br>
            <strong>${name}</strong><br>
            Full-Stack Developer
        </p>

    </div>

    <!-- Footer -->
    <div style="background:#f0f9ff;padding:12px;text-align:center;font-size:14px;color:#666;">
        © ${new Date().getFullYear()} ${name} Portfolio <br/>
        Maharashtra, India
    </div>

</div>

</body>
</html>
`;
};


