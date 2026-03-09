import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import CandidateCard from "../components/CandidateCard";

export default function Results() {

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchResults = async () => {

      try {

        const sessionId = localStorage.getItem("sessionId");
        const token = localStorage.getItem("token");

        if (!sessionId) {
          setError("No screening session found.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API_URL}/bulkscreening/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("API:", res.data);

        setCandidates(res.data || []);

      } catch (err) {
        console.log(err);
        setError("Unable to load screening results.");
      }

      setLoading(false);

    };

    fetchResults();

  }, []);

  // Categorize using matchCategory from API
  const suitable = candidates.filter(
    c => c.matchCategory === "Qualified"
  );

  const partial = candidates.filter(
    c => c.matchCategory === "PartiallyQualified"
  );

  const notSuitable = candidates.filter(
    c => c.matchCategory === "NotQualified"
  );

  if (loading) {
    return (
      <div className="layout">
        <Sidebar />
        <div className="main">
          <h2>Loading screening results...</h2>
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

      <div className="main">

        {/* HEADER */}

        <div className="results-header">

          <div>
            <h1>Screening Results</h1>
            <p>Analyzed {candidates.length} candidates</p>
          </div>

          <button
            className="new-btn"
            onClick={() => window.location.href="/dashboard"}
          >
            New Screening
          </button>

        </div>


        {/* SUMMARY CARDS */}

        <div className="summary-cards">

          <div className="card green">
            <h3>Highly Suitable</h3>
            <h1>{suitable.length}</h1>
            <p>Match &gt; 75%</p>
          </div>

          <div className="card yellow">
            <h3>Partially Suitable</h3>
            <h1>{partial.length}</h1>
            <p>Match 40–74%</p>
          </div>

          <div className="card red">
            <h3>Not Suitable</h3>
            <h1>{notSuitable.length}</h1>
            <p>Match &lt; 40%</p>
          </div>

        </div>


        {/* RESULTS GRID */}

        <div className="results-grid">

          {/* HIGHLY SUITABLE */}

          <div className="column">

            <h3 className="green-text">● Highly Suitable</h3>

            {suitable.map((c) => (
              <CandidateCard
                key={c.id}
                fileName={c.fileName}
                matchScore={c.matchScore}
                aiReasoning={c.aiReasoning}
                createdAt={c.createdAt}
              />
            ))}

          </div>


          {/* PARTIAL */}

          <div className="column">

            <h3 className="yellow-text">● Partially Suitable</h3>

            {partial.map((c) => (
              <CandidateCard
                key={c.id}
                fileName={c.fileName}
                matchScore={c.matchScore}
                aiReasoning={c.aiReasoning}
                createdAt={c.createdAt}
              />
            ))}

          </div>


          {/* NOT SUITABLE */}

          <div className="column">

            <h3 className="red-text">● Not Suitable</h3>

            {notSuitable.map((c) => (
              <CandidateCard
                key={c.id}
                fileName={c.fileName}
                matchScore={c.matchScore}
                aiReasoning={c.aiReasoning}
                createdAt={c.createdAt}
              />
            ))}

          </div>

        </div>

      </div>

    </div>

  );

}