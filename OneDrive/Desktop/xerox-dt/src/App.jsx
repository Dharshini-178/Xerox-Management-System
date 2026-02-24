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
  const [selectedOption, setSelectedOption] = useState("profile");
  const [file, setFile] = useState(null);
  const [color, setColor] = useState("bw");
  const [copies, setCopies] = useState(1);
  const [pages, setPages] = useState(1);
  const [orientation, setOrientation] = useState("vertical");
  const [printType, setPrintType] = useState("assignment");
  const [submitted, setSubmitted] = useState(false);
  
  // Paper request states
  const [paperType, setPaperType] = useState("");
  const [paperQuantity, setPaperQuantity] = useState(1);
  const [paperSubmitted, setPaperSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="dashboard-bg">
        <div className="staff-layout">
          <div className="staff-sidebar">
            <div className="sidebar-profile">
              <div className="sidebar-avatar">👤</div>
              <h3>John Doe</h3>
              <p>Staff ID: 101</p>
            </div>
            <div className="sidebar-menu">
              <button className="menu-item" onClick={() => { setSelectedOption("profile"); setSubmitted(false); }}>
                <span className="menu-icon">👤</span> Profile
              </button>
              <button className="menu-item" onClick={() => { setSelectedOption("printing"); setSubmitted(false); }}>
                <span className="menu-icon">🖨</span> Printing
              </button>
              <button className="menu-item" onClick={() => { setSelectedOption("paper"); setSubmitted(false); }}>
                <span className="menu-icon">📄</span> Paper Request
              </button>
            </div>
            <button className="sidebar-logout" onClick={() => setPage("login")}>
              🚪 Logout
            </button>
          </div>
          <div className="staff-content">
            <div className="content-header">
              <h2>✅ Order Submitted</h2>
              <p>Your document has been sent for printing.</p>
            </div>
            <div className="profile-section">
              <div className="profile-info">
                <div className="profile-field">
                  <label>Print Type</label>
                  <span>{printType}</span>
                </div>
                <div className="profile-field">
                  <label>Orientation</label>
                  <span>{orientation === "vertical" ? "Vertical" : "Horizontal"}</span>
                </div>
                <div className="profile-field">
                  <label>Color</label>
                  <span>{color === "bw" ? "Black & White" : "Color"}</span>
                </div>
                <div className="profile-field">
                  <label>Copies</label>
                  <span>{copies}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (paperSubmitted) {
    return (
      <div className="dashboard-bg">
        <div className="staff-layout">
          <div className="staff-sidebar">
            <div className="sidebar-profile">
              <div className="sidebar-avatar">👤</div>
              <h3>John Doe</h3>
              <p>Staff ID: 101</p>
            </div>
            <div className="sidebar-menu">
              <button className="menu-item" onClick={() => { setSelectedOption("profile"); setPaperSubmitted(false); }}>
                <span className="menu-icon">👤</span> Profile
              </button>
              <button className="menu-item" onClick={() => { setSelectedOption("printing"); setPaperSubmitted(false); }}>
                <span className="menu-icon">🖨</span> Printing
              </button>
              <button className="menu-item" onClick={() => { setSelectedOption("paper"); setPaperSubmitted(false); }}>
                <span className="menu-icon">📄</span> Paper Request
              </button>
            </div>
            <button className="sidebar-logout" onClick={() => setPage("login")}>
              🚪 Logout
            </button>
          </div>
          <div className="staff-content">
            <div className="content-header">
              <h2>✅ Paper Request Submitted</h2>
              <p>Your paper request has been sent to admin.</p>
            </div>
            <div className="profile-section">
              <div className="profile-info">
                <div className="profile-field">
                  <label>Paper Type</label>
                  <span>{paperType}</span>
                </div>
                <div className="profile-field">
                  <label>Quantity</label>
                  <span>{paperQuantity} reams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg">
      <div className="staff-layout">
        {/* Left Sidebar - 30% */}
        <div className="staff-sidebar">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">👤</div>
            <h3>John Doe</h3>
            <p>Staff ID: 101</p>
          </div>
          
          <div className="sidebar-menu">
            <button 
              className={`menu-item ${selectedOption === "profile" ? "active" : ""}`}
              onClick={() => setSelectedOption("profile")}
            >
              <span className="menu-icon">👤</span> Profile
            </button>
            
            <button 
              className={`menu-item ${selectedOption === "printing" ? "active" : ""}`}
              onClick={() => setSelectedOption("printing")}
            >
              <span className="menu-icon">🖨</span> Printing
            </button>
            
            <button 
              className={`menu-item ${selectedOption === "paper" ? "active" : ""}`}
              onClick={() => setSelectedOption("paper")}
            >
              <span className="menu-icon">📄</span> Paper Request
            </button>
          </div>

          <button className="sidebar-logout" onClick={() => setPage("login")}>
            🚪 Logout
          </button>
        </div>

        {/* Right Content Area - 70% */}
        <div className="staff-content">
          {selectedOption === "profile" && (
            <>
              <div className="content-header">
                <h2>👤 My Profile</h2>
                <p>View your staff information</p>
              </div>
              <div className="profile-section">
                <div className="profile-info">
                  <div className="profile-field">
                    <label>Staff ID</label>
                    <span>101</span>
                  </div>
                  <div className="profile-field">
                    <label>Name</label>
                    <span>John Doe</span>
                  </div>
                  <div className="profile-field">
                    <label>Email</label>
                    <span>john.doe@xerox.com</span>
                  </div>
                  <div className="profile-field">
                    <label>Role</label>
                    <span>Staff</span>
                  </div>
                  <div className="profile-field">
                    <label>Department</label>
                    <span>Printing Services</span>
                  </div>
                  <div className="profile-field">
                    <label>Joined Date</label>
                    <span>Jan 2024</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedOption === "printing" && (
            <>
              <div className="content-header">
                <h2>🖨 Print Request</h2>
                <p>Upload & configure your print</p>
              </div>
              <div className="print-section">
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
                <div className="print-options-grid">
                  <div className="option">
                    <label>Color</label>
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                      <option value="bw">Black & White</option>
                      <option value="color">Color</option>
                    </select>
                  </div>

                  <div className="option">
                    <label>Print Type</label>
                    <select value={printType} onChange={(e) => setPrintType(e.target.value)}>
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
              </div>
            </>
          )}

          {selectedOption === "paper" && (
            <>
              <div className="content-header">
                <h2>📄 Paper Request</h2>
                <p>Request paper supplies</p>
              </div>
              <div className="paper-request-section">
                <div className="paper-type-grid">
                  <div 
                    className={`paper-type-card ${paperType === "A4" ? "selected" : ""}`}
                    onClick={() => setPaperType("A4")}
                  >
                    <div className="icon">📄</div>
                    <h4>A4 Paper</h4>
                    <p>Standard office paper</p>
                  </div>
                  <div 
                    className={`paper-type-card ${paperType === "A3" ? "selected" : ""}`}
                    onClick={() => setPaperType("A3")}
                  >
                    <div className="icon">📑</div>
                    <h4>A3 Paper</h4>
                    <p>Large format</p>
                  </div>
                  <div 
                    className={`paper-type-card ${paperType === "Legal" ? "selected" : ""}`}
                    onClick={() => setPaperType("Legal")}
                  >
                    <div className="icon">📋</div>
                    <h4>Legal Size</h4>
                    <p>Legal documents</p>
                  </div>
                </div>

                <div className="quantity-selector">
                  <label>Quantity (reams):</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => setPaperQuantity(Math.max(1, paperQuantity - 1))}
                    >-</button>
                    <span className="quantity-value">{paperQuantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => setPaperQuantity(paperQuantity + 1)}
                    >+</button>
                  </div>
                </div>

                <button
                  className="submit-request-btn"
                  disabled={!paperType}
                  onClick={() => setPaperSubmitted(true)}
                >
                  📤 Submit Paper Request
                </button>
              </div>
            </>
          )}
        </div>
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
