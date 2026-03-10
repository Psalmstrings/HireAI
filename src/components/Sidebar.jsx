import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>HireNaija AI Recruiter</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        {/* <Link to="/results">Results</Link> */}
        <Link to="/history">History</Link>
      </nav>
    </div>
  );
}