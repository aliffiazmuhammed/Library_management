import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RegisterForm } from "@/components/registerForm";

const Register = ()=> {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(AuthContext); // 🔹 assumes register exists in your AuthContext
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const success = await register(name, email, password);
  if (success) {
    navigate("/dashboard");
  } else {
    alert("Registration failed. Check console for errors.");
  }
};

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          name={name}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Register;
