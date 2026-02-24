import { useState } from "react";
import QRCode from "qrcode.react";

export default function User() {
  const [amount, setAmount] = useState(0);
  const [paid, setPaid] = useState(false);

  const generateAmount = () => {
    let total = 50; // demo base price
    setAmount(total);
  };

  const submitJob = () => {
    if (!paid) return alert("Please complete payment first");

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    jobs.push({ amount, status: "Pending" });
    localStorage.setItem("jobs", JSON.stringify(jobs));
    alert("Print job submitted!");
  };

  return (
    <div className="page">
      <h1>Print Request</h1>

      <div className="form-grid">

        <div className="form-card">
          <h3>Upload Document</h3>
          <input type="file" />
        </div>

        <div className="form-card">
          <h3>Print Options</h3>

          <label>Color</label>
          <select>
            <option>Black & White</option>
            <option>Color</option>
          </select>

          <label>Copies</label>
          <input type="number" defaultValue="1" />

          <label>Binding</label>
          <select>
            <option>None</option>
            <option>Spiral</option>
            <option>Hard Bind</option>
          </select>
        </div>

        <div className="form-card">
          <h3>Payment</h3>

          <button onClick={generateAmount}>
            Generate Amount
          </button>

          {amount > 0 && (
            <>
              <p>Total: ₹{amount}</p>
              <QRCode value={`Pay ₹${amount}`} />
            </>
          )}

          <label className="check">
            <input type="checkbox"
              onChange={e=>setPaid(e.target.checked)} />
            Payment Completed
          </label>

          <button onClick={submitJob}>
            Submit Print Job
          </button>
        </div>

      </div>
    </div>
  );
}
