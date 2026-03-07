export default function CandidateCard({name, role, score, keywords, reason}) {

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{role}</p>

      <h2>{score}% Match</h2>

      <div className="keywords">
        {keywords.map((k,i)=>(
          <span key={i}>{k}</span>
        ))}
      </div>

      <p className="reason">{reason}</p>
    </div>
  );
}