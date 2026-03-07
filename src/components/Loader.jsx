export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Extracting keywords (TF-IDF)...</p>
      <p>Running ML Classifier...</p>
      <p>Ranking Candidates...</p>
    </div>
  );
}