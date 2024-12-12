"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { registerUser, verifyUser } from "@/services/api/userService";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const router = useRouter();

  // Handle form submission for registration
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    // Validate form inputs
    if (!name || !email || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const registerData = { email, password, name };
      await registerUser(registerData); // Không cần kiểm tra phản hồi
      setShowVerification(true); // Chuyển ngay sang bước xác minh
    } catch (err) {
      console.error("Register error:", err);
      if (err instanceof Error) {
        setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
      } else {
        setError("Đăng ký thất bại. Vui lòng thử lại.");
      }
    }
  };

 // Handle verification code submission
const handleVerify = async () => {
    setError("");
  
    if (!verificationCode) {
      setError("Vui lòng nhập mã xác minh.");
      return;
    }
  
    try {
      const verifyData = { email, verificationCode, name: "", password: "" };
      const verifyResponse = await verifyUser(verifyData);
  
      console.log("API Response:", verifyResponse); // Ghi log phản hồi API để debug
  
      // Kiểm tra điều kiện dựa trên phản hồi từ API
      if (verifyResponse?.message === "Xác thực email thành công") {
        router.push("/login");
      } else {
        setError(verifyResponse?.message || "Mã xác minh không đúng.");
      }
    } catch (error: unknown) {
      console.error("Verification error:", error);
  
      // Đảm bảo error là một đối tượng có thể có `message`
      if (error instanceof Error) {
        setError(error.message || "Xác minh thất bại. Vui lòng thử lại.");
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
    }
  };
  
  
  return (
    <Container className="bg-white" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>

        {!showVerification ? (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Họ và tên"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <Typography color="error">{error}</Typography>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng ký
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" gutterBottom>
              Vui lòng nhập mã xác minh đã được gửi đến email của bạn:
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="verificationCode"
              label="Mã xác minh"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleVerify}
            >
              Xác minh
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
