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

    const users = JSON.parse(localStorage.getItem("users")) || [];
    
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
  const [printType, setPrintType] = useState("single-side");
  const [submitted, setSubmitted] = useState(false);
  
  // Paper request states
  const [paperType, setPaperType] = useState("");
  const [paperQuantity, setPaperQuantity] = useState(1);
  const [paperSubmitted, setPaperSubmitted] = useState(false);

  // Change password states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Profile edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("Dharshini");
  const [editEmail, setEditEmail] = useState("p.dharshinilogesh@gmail.com");
  const [editPhone, setEditPhone] = useState("6379558620");
  const [editDepartment, setEditDepartment] = useState("ECE");

  // Save profile changes
  const saveProfile = () => {
    setIsEditing(false);
  };

  // Cancel profile edit
  const cancelEdit = () => {
    setEditName("Dharshini");
    setEditEmail("p.dharshinilogesh@gmail.com");
    setEditPhone("6379558620");
    setEditDepartment("ECE");
    setIsEditing(false);
  };

  if (submitted) {
    return (
      <div className="dashboard-bg">
        <div className="staff-layout">
          <div className="staff-sidebar">
            <div className="sidebar-profile">
              <div className="sidebar-avatar">👤</div>
              <h3>{editName}</h3>
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
                  <span>{printType === "single-side" ? "Single Side" : "Front and Back"}</span>
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
              <h3>{editName}</h3>
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
            <h3>{editName}</h3>
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
              <div className="content-header-with-action">
                <div>
                  <h2>👤 My Profile</h2>
                  <p>View your staff information</p>
                </div>
                {isEditing ? (
                  <div className="edit-actions">
                    <button className="save-btn" onClick={saveProfile}>💾 Save</button>
                    <button className="cancel-btn" onClick={cancelEdit}>✖ Cancel</button>
                  </div>
                ) : (
                  <button className="edit-icon-btn" onClick={() => setIsEditing(true)}>
                    ✏️
                  </button>
                )}
              </div>
              <div className="profile-section">
                <div className="profile-info">
                  <div className="profile-field">
                    <label>Staff ID</label>
                    <span>101</span>
                  </div>
                  <div className="profile-field">
                    <label>Name</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editName} 
                        onChange={(e) => setEditName(e.target.value)}
                        className="profile-edit-input"
                      />
                    ) : (
                      <span>{editName}</span>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Email</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={editEmail} 
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="profile-edit-input"
                      />
                    ) : (
                      <span>{editEmail}</span>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Phone Number</label>
                    {isEditing ? (
                      <input 
                        type="tel" 
                        value={editPhone} 
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="profile-edit-input"
                        maxLength={10}
                      />
                    ) : (
                      <span>{editPhone}</span>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Department</label>
                    {isEditing ? (
                      <select 
                        value={editDepartment} 
                        onChange={(e) => setEditDepartment(e.target.value)}
                        className="profile-edit-select"
                      >
                        <option value="ECE">ECE</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="EEE">EEE</option>
                      </select>
                    ) : (
                      <span>{editDepartment}</span>
                    )}
                  </div>
                  <div className="profile-field">
                    <label>Joined Date</label>
                    <span>Feb 2026</span>
                  </div>
                </div>
                <div className="profile-actions">
                  <span className="change-password-link" onClick={() => setShowChangePassword(true)}>🔐 Change Password</span>
                </div>
              </div>

              {/* Change Password Popup */}
              {showChangePassword && (
                <div className="popup-overlay" onClick={() => setShowChangePassword(false)}>
                  <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Change Password</h3>
                    <div className="popup-input-group">
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordError("");
                        }}
                      />
                    </div>
                    {passwordError && <div className="popup-error">{passwordError}</div>}
                    {passwordSuccess && <div className="popup-success">Password changed successfully!</div>}
                    <div className="popup-buttons">
                      <button 
                        className="popup-cancel" 
                        onClick={() => {
                          setShowChangePassword(false);
                          setNewPassword("");
                          setPasswordError("");
                          setPasswordSuccess(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        className="popup-submit"
                        onClick={() => {
                          if (!newPassword || newPassword.length < 4) {
                            setPasswordError("Password must be at least 4 characters");
                            return;
                          }
                          setPasswordSuccess(true);
                          setTimeout(() => {
                            setShowChangePassword(false);
                            setNewPassword("");
                            setPasswordSuccess(false);
                          }, 2000);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                      <option value="single-side">Single Side</option>
                      <option value="front-and-back">Front and Back</option>
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
                  onClick={() => {
                    const printJobs = JSON.parse(localStorage.getItem("printJobs")) || [];
                    printJobs.push({
                      userName: editName,
                      userId: "101",
                      printType: printType,
                      orientation: orientation,
                      color: color,
                      copies: copies,
                      pages: pages,
                      fileName: file.name,
                      date: new Date().toLocaleDateString(),
                      status: "Pending"
                    });
                    localStorage.setItem("printJobs", JSON.stringify(printJobs));
                    setSubmitted(true);
                  }}
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
                    className={`paper-type-card ${paperType === "Bond" ? "selected" : ""}`}
                    onClick={() => setPaperType("Bond")}
                  >
                    <div className="icon">📑</div>
                    <h4>Bond Paper</h4>
                    <p>High quality paper</p>
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
                  onClick={() => {
                    const paperRequests = JSON.parse(localStorage.getItem("paperRequests")) || [];
                    paperRequests.push({
                      userName: editName,
                      userId: "101",
                      paperType: paperType,
                      quantity: paperQuantity,
                      date: new Date().toLocaleDateString(),
                      status: "Pending"
                    });
                    localStorage.setItem("paperRequests", JSON.stringify(paperRequests));
                    setPaperSubmitted(true);
                  }}
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
  const [selectedOption, setSelectedOption] = useState("history");

  // Load data from localStorage with lazy initialization
  const [printJobs, setPrintJobs] = useState(() => {
    const saved = localStorage.getItem("printJobs");
    return saved ? JSON.parse(saved) : [];
  });

  const [paperRequests, setPaperRequests] = useState(() => {
    const saved = localStorage.getItem("paperRequests");
    return saved ? JSON.parse(saved) : [];
  });

  // Force re-render to refresh data
  const [, setTick] = useState(0);
  const refreshData = () => setTick(t => t + 1);

  // Reload data from localStorage
  const reloadData = () => {
    const savedPrintJobs = localStorage.getItem("printJobs");
    const savedPaperRequests = localStorage.getItem("paperRequests");
    if (savedPrintJobs) {
      setPrintJobs(JSON.parse(savedPrintJobs));
    }
    if (savedPaperRequests) {
      setPaperRequests(JSON.parse(savedPaperRequests));
    }
  };

  // Handle option change with refresh
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Reload data from localStorage when switching tabs
    reloadData();
  };

  // Approve paper request
  const approvePaperRequest = (index) => {
    const updated = [...paperRequests];
    updated[index].status = "Approved";
    setPaperRequests(updated);
    localStorage.setItem("paperRequests", JSON.stringify(updated));
  };

  // Reject paper request
  const rejectPaperRequest = (index) => {
    const updated = [...paperRequests];
    updated[index].status = "Rejected";
    setPaperRequests(updated);
    localStorage.setItem("paperRequests", JSON.stringify(updated));
  };

  // Update print job status
  const updatePrintStatus = (index, status) => {
    const updated = [...printJobs];
    updated[index].status = status;
    setPrintJobs(updated);
    localStorage.setItem("printJobs", JSON.stringify(updated));
  };

  return (
    <div className="dashboard-bg">
      <div className="staff-layout">
        {/* Left Sidebar - 30% */}
        <div className="staff-sidebar">
          <div className="sidebar-profile">
            <div className="sidebar-avatar">⚙️</div>
            <h3>Admin</h3>
            <p>Administrator</p>
          </div>

          <div className="sidebar-menu">
            <button
              className={`menu-item ${selectedOption === "history" ? "active" : ""}`}
              onClick={() => handleOptionChange("history")}
            >
              <span className="menu-icon">📋</span> History
            </button>

            <button
              className={`menu-item ${selectedOption === "paperRequest" ? "active" : ""}`}
              onClick={() => handleOptionChange("paperRequest")}
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
          {selectedOption === "history" && (
            <>
              <div className="content-header">
                <h2>📋 Print History</h2>
                <p>View all print requests from staff</p>
              </div>
              <div className="history-section">
                {printJobs.length === 0 ? (
                  <div className="empty-state">
                    <p>No print jobs yet</p>
                  </div>
                ) : (
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Print Type</th>
                        <th>Copies</th>
                        <th>Pages</th>
                        <th>Total Papers</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {printJobs.map((job, index) => (
                        <tr key={index}>
                          <td>{job.userName || "Staff User"}</td>
                          <td>{job.printType === "single-side" ? "Single Side" : job.printType === "front-and-back" ? "Front and Back" : job.printType}</td>
                          <td>{job.copies || 1}</td>
                          <td>{job.pages || 1}</td>
                          <td>{(job.copies || 1) * (job.pages || 1)}</td>
                          <td>{job.date || new Date().toLocaleDateString()}</td>
                          <td>
                            <span className={`status-badge ${job.status?.toLowerCase() || "pending"}`}>
                              {job.status || "Pending"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              {job.status !== "Completed" && (
                                <>
                                  <button
                                    className="approve-btn"
                                    onClick={() => {
                                      updatePrintStatus(index, "Completed");
                                      refreshData();
                                    }}
                                  >
                                    ✓ Complete
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {selectedOption === "paperRequest" && (
            <>
              <div className="content-header">
                <h2>📄 Paper Request</h2>
                <p>Approve or reject paper requests from staff</p>
              </div>
              <div className="paper-request-admin-section">
                {paperRequests.length === 0 ? (
                  <div className="empty-state">
                    <p>No paper requests yet</p>
                  </div>
                ) : (
                  <div className="paper-requests-list">
                    {paperRequests.map((request, index) => (
                      <div key={index} className="paper-request-card">
                        <div className="request-info">
                          <div className="request-field">
                            <label>User Name</label>
                            <span>{request.userName || "Staff User"}</span>
                          </div>
                          <div className="request-field">
                            <label>Paper Type</label>
                            <span>{request.paperType || "A4"}</span>
                          </div>
                          <div className="request-field">
                            <label>Quantity</label>
                            <span>{request.quantity || 1} reams</span>
                          </div>
                          <div className="request-field">
                            <label>Date</label>
                            <span>{request.date || new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="request-field">
                            <label>Status</label>
                            <span className={`status-badge ${request.status?.toLowerCase() || "pending"}`}>
                              {request.status || "Pending"}
                            </span>
                          </div>
                        </div>
                        <div className="request-actions">
                          {request.status === "Pending" && (
                            <>
                              <button
                                className="approve-btn"
                                onClick={() => {
                                  approvePaperRequest(index);
                                  refreshData();
                                }}
                              >
                                ✓ Approve
                              </button>
                              <button
                                className="reject-btn"
                                onClick={() => {
                                  rejectPaperRequest(index);
                                  refreshData();
                                }}
                              >
                                ✗ Reject
                              </button>
                            </>
                          )}
                          {request.status === "Approved" && (
                            <span className="approved-text">✓ Approved</span>
                          )}
                          {request.status === "Rejected" && (
                            <span className="rejected-text">✗ Rejected</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
