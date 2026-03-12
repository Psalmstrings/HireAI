import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>HireNaija AI</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/screening">Screening</Link>
        <Link to="/history">History</Link>
      </nav>
    </div>
  );
}