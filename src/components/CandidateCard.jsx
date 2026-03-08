export default function CandidateCard({
  fileName,
  matchScore,
  aiReasoning,
  createdAt
}) {

  return (

    <div className="candidate-card">

      <div className="card-header">

        <h4>{fileName}</h4>

        <span className="score">
          {Math.round(matchScore)}%
        </span>

      </div>

      <p className="reason">
        {aiReasoning}
      </p>

      <small>
        Uploaded {new Date(createdAt).toLocaleString()}
      </small>

    </div>

  );
}