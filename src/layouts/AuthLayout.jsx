import { Outlet } from "react-router-dom";
import "./AuthLayout.css";
import logoPath from "../assets/logo.png";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <header className="header">
        <h2>BankOne</h2>
        <img src={logoPath} alt="bank logo" height="100" />
      </header>
      <div className="auth-container">
        <div className="auth-card">
          <Outlet />
        </div>
      </div>
      <footer className="auth-footer">
        © 2026 BankOne. All rights reserved.
      </footer>
    </div>
  );
}

export default AuthLayout;
