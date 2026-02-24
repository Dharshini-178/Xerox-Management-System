import { useState } from "react";
import "./index.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("staff");

  return (
    <>
      {page === "login" && (
        <Login setPage={setPage} role={role} setRole={setRole} />
      )}

      {page === "register" && <Register setPage={setPage} />}

      {page === "staff" && <StaffDashboard setPage={setPage} />}

      {page === "admin" && <AdminDashboard setPage={setPage} />}
    </>
  );
}

/* ---------- LOGIN ---------- */

function Login({ setPage, role, setRole }) {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (role === "staff" && id === "101" && pass === "123") {
      setPage("staff");
    } else if (role === "admin" && id === "admin" && pass === "admin123") {
      setPage("admin");
    } else {
      setError("❌ Invalid ID or Password");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        <div className="role-switch">
          <button
            className={`role-btn ${role === "staff" ? "active" : ""}`}
            onClick={() => {
              setRole("staff");
              setError("");
            }}
          >
            👔 Staff
          </button>

          <button
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => {
              setRole("admin");
              setError("");
            }}
          >
            🛠 Admin
          </button>
        </div>

        <h2>{role === "staff" ? "Staff Login" : "Admin Login"}</h2>

        <div className="input-group">
          <div className="input-icon">👤</div>
          <input
            className="login-input"
            placeholder="ID"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">🔒</div>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="hint">
          Staff → 101 / 123 <br />
          Admin → admin / admin123
        </p>

        {role === "staff" && (
          <p className="register-link">
            New user? <span onClick={() => setPage("register")}>Register</span>
          </p>
        )}

      </div>
    </div>
  );
}

/* ---------- REGISTER ---------- */

function Register({ setPage }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    // Validation
    if (!email || !username || !password || !phone) {
      setError("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      setError("Email already registered");
      return;
    }

    users.push({ email, username, password, phone });
    localStorage.setItem("users", JSON.stringify(users));
    
    setSuccess(true);
    setTimeout(() => {
      setPage("login");
    }, 2000);
  };

  if (success) {
    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="success-message">
            <h2>✅ Registration Successful!</h2>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="register-title">Create your account</h2>

        <div className="input-group">
          <div className="input-icon">📧</div>
          <input
            className="login-input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">👤</div>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">🔒</div>
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-group">
          <div className="input-icon">📱</div>
          <input
            className="login-input"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="register-link">
          Already have an account? <span onClick={() => setPage("login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

/* ---------- STAFF DASHBOARD ---------- */

function StaffDashboard({ setPage }) {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState("bw");
  const [copies, setCopies] = useState(1);
  const [pages, setPages] = useState(1);
  const [orientation, setOrientation] = useState("vertical");
  const [printType, setPrintType] = useState("assignment");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="dashboard-bg">
        <div className="dashboard-card">
          <h1>✅ Order Submitted</h1>
          <p className="dashboard-text">
            Your document has been sent for printing.<br />
            Print Type: <b>{printType}</b><br />
            Orientation: <b>{orientation === "vertical" ? "Vertical" : "Horizontal"}</b>
          </p>

          <button className="logout-btn" onClick={() => setPage("login")}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="dashboard-card">

        <h1>👔 Staff Dashboard</h1>
        <p className="dashboard-text">
          Upload & configure your print
        </p>

        {/* Upload */}
        <div className="upload-box">
          <input
            type="file"
            id="fileUpload"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="fileUpload" className="upload-label">
            📄 {file ? file.name : "Click to upload document"}
          </label>
        </div>

        {/* Print Options */}
        <div className="print-options">

          <div className="option">
            <label>Color</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="bw">Black & White</option>
              <option value="color">Color</option>
            </select>
          </div>

          <div className="option">
            <label>Print Type</label>
            <select value={printType} onChange={(e) => setPrintType(e.target.value)} >
              <option value="assignment">Assignment</option>
              <option value="report">Report</option>
              <option value="binding">Binding</option>
            </select>
          </div>

          <div className="option">
            <label>Orientation</label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
            >
              <option value="vertical">Vertical (Portrait)</option>
              <option value="horizontal">Horizontal (Landscape)</option>
            </select>
          </div>

          <div className="option">
            <label>No. of Copies</label>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
            />
          </div>

          <div className="option">
            <label>Pages per Copy</label>
            <input
              type="number"
              min="1"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>

        </div>

        <button
          className="print-btn"
          disabled={!file}
          onClick={() => setSubmitted(true)}
        >
          📤 Submit Print Request
        </button>

        <button className="logout-btn" onClick={() => setPage("login")}>
          Logout
        </button>

      </div>
    </div>
  );
}


/* ---------- ADMIN DASHBOARD ---------- */

function AdminDashboard({ setPage }) {
  return (
    <div className="dashboard">
      <h1>🛠 Admin Dashboard</h1>
      <p>Manage users, documents and reports.</p>

      <button onClick={() => setPage("login")}>Logout</button>
    </div>
  );
}
