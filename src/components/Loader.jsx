export default function Loader() {
  return (
    <div className="ai-loader">

      <div className="loader-card">

        {/* Icon */}
        <div className="ai-icon">
          🧠
        </div>

        {/* Title */}
        <h2>AI Processing in Progress</h2>

        <p className="subtitle">
          Analyzing candidates with machine learning algorithms
        </p>

        {/* Progress bar */}
        <div className="progress-bar">
          <div className="progress"></div>
        </div>

        {/* Current task */}
        <div className="task">
          🔎 Computing semantic similarity...
        </div>

        {/* Steps */}
        <div className="steps">

          <div className="step">
            ⚡
            <span>TF-IDF</span>
          </div>

          <div className="step">
            🧠
            <span>ML Classifier</span>
          </div>

          <div className="step">
            🔍
            <span>Semantic</span>
          </div>

        </div>

      </div>

    </div>
  );
}