import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import CandidateCard from "../components/CandidateCard";

export default function Results() {

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API || "https://hirenaija.runasp.net/api";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const sessionId = localStorage.getItem("sessionId");
        const token = localStorage.getItem("token");

        if (!sessionId) {
          setError("No session ID found. Please run a screening first.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_URL}/bulkscreening/session/${sessionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("API Response:", res.data);

        // Backend returns a list of CV results
        setCandidates(res.data || []);

      } catch (err) {
        console.log(err);
        setError("Failed to fetch results. Please try again.");
      }

      setLoading(false);
    };

    fetchResults();
  }, []);

  // Categorize candidates based on matchCategory or matchScore
  const suitable = candidates.filter(c => c.matchScore > 75 || c.matchCategory === "Qualified");
  const partial = candidates.filter(c => c.matchScore >= 40 && c.matchScore <= 74 || c.matchCategory === "PartiallyQualified");
  const notSuitable = candidates.filter(c => c.matchScore < 40 || c.matchCategory === "NotQualified");

  if (loading) {
    return (
      <div className="layout">
        <Sidebar />
        <div className="main">
          <h2>Loading AI Results...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="layout">
        <Sidebar />
        <div className="main">
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="results" style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px"
      }}>

        <div className="column green" style={{ flex: 1, minWidth: "300px" }}>
          <h2>🟢 Suitable</h2>
          {suitable.map((c, i) => (
            <CandidateCard key={i} {...c} />
          ))}
        </div>

        <div className="column yellow" style={{ flex: 1, minWidth: "300px" }}>
          <h2>🟡 Partially Suitable</h2>
          {partial.map((c, i) => (
            <CandidateCard key={i} {...c} />
          ))}
        </div>

        <div className="column red" style={{ flex: 1, minWidth: "300px" }}>
          <h2>🔴 Not Suitable</h2>
          {notSuitable.map((c, i) => (
            <CandidateCard key={i} {...c} />
          ))}
        </div>

      </div>
    </div>
  );
}