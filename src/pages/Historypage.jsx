import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function HistoryResults() {

  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://hirenaija.runasp.net/api";

  const searchHistory = async () => {

    if (!title) {
      setError("Please enter a job title");
      return;
    }

    setLoading(true);
    setError("");

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/bulkscreening/history`,
        {
          params: { title },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setResults(res.data || []);

    } catch (err) {

      console.log(err);
      setError("Failed to fetch history");

    }

    setLoading(false);
  };

  return (

    <div className="layout">

      <Sidebar />

      <div className="main">

        {/* SEARCH SECTION */}

        <div className="history-search">

          <h2>Search Screening History</h2>

          <div className="search-box">

            <input
              type="text"
              placeholder="Enter job title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={searchHistory}>
              Search
            </button>

          </div>

          {error && <p className="error">{error}</p>}

        </div>


        {/* RESULTS SECTION */}

       <div className="history-results">

  {loading && <p>Loading results...</p>}

  {!loading && results.length === 0 && (
    <p className="empty">No screening history found</p>
  )}

  {results.map((item) => (

    <div key={item.id} className="history-card">

      <div className="history-header">

        <h3>{item.jobTitle}</h3>

        <span
          className={`score ${
            item.matchScore > 75
              ? "green"
              : item.matchScore >= 40
              ? "yellow"
              : "red"
          }`}
        >
          {Math.round(item.matchScore)}%
        </span>

      </div>

      <p className="file">
        <strong>Candidate CV:</strong> {item.fileName}
      </p>

      <p className="category">
        <strong>Category:</strong> {item.matchCategory}
      </p>

      <p className="reason">
        {item.aiReasoning}
      </p>

      <p className="date">
        {new Date(item.createdAt).toLocaleString()}
      </p>

    </div>

  ))}

</div>

      </div>

    </div>

  );
}