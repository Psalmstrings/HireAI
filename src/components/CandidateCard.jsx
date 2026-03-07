import React from "react";

export default function CandidateCard({
  fileName,
  filePath,
  matchScore,
  matchCategory,
  aiReasoning,
  createdAt,
  updatedAt
}) {

  // Color based on matchScore
  const getScoreColor = () => {
    if (matchScore > 75) return "#22c55e"; // green
    if (matchScore >= 40) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="candidate-card" style={{
      border: `2px solid ${getScoreColor()}`,
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h3 style={{ margin: 0 }}>{fileName}</h3>
        <span style={{ fontWeight: "bold", color: getScoreColor() }}>{matchScore}%</span>
      </div>

      <p style={{ margin: "4px 0", fontStyle: "italic" }}>{matchCategory}</p>

      <p style={{ fontSize: "13px", color: "#374151" }}>
        <strong>AI Reasoning:</strong> {aiReasoning}
      </p>

      {filePath && (
        <p style={{ fontSize: "13px", marginTop: "4px" }}>
          <a href={filePath} target="_blank" rel="noopener noreferrer">
            Download CV
          </a>
        </p>
      )}

      <p style={{ fontSize: "11px", color: "#6b7280", marginTop: "6px" }}>
        Created: {new Date(createdAt).toLocaleString()} | Updated: {new Date(updatedAt).toLocaleString()}
      </p>
    </div>
  );
}