import { Link } from "react-router-dom";
import "../styles.css";

export default function Homepage() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="nav">
        <h2 className="logo">HireNaija AI</h2>

        <div className="nav-links">
          <Link to="/" className="home">Home</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </nav>


      {/* HERO SECTION */}
      <section className="hero-section">

        <div className="hero-text">
          <h1>
            AI Powered <span>Candidate Screening</span>
          </h1>

          <p>
            Instantly analyze and rank candidates using AI. 
            Hire faster, smarter and eliminate manual CV screening.
          </p>

          <Link to="/login" className="hero-btn">
            Start Screening
          </Link>
        </div>

        <div className="hero-image">
          <div className="mock-card">
            <h3>AI Screening Results</h3>
            <p>React Developer</p>

            <div className="score green">John Doe — 82%</div>
            <div className="score yellow">Mary James — 65%</div>
            <div className="score red">Paul Smith — 30%</div>
          </div>
        </div>

      </section>


      {/* FEATURES */}
      <section className="features">

        <h2>Why Recruiters Use HireNaija AI</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>⚡ Instant Screening</h3>
            <p>
              Upload CVs and let AI instantly rank candidates based on job requirements.
            </p>
          </div>

          <div className="feature-card">
            <h3>🧠 Smart AI Matching</h3>
            <p>
              Our AI extracts skills, keywords and experience from resumes automatically.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Candidate Ranking</h3>
            <p>
              Automatically categorize applicants into Suitable, Partially Suitable and Not Suitable.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="how">

        <h2>How It Works</h2>

        <div className="steps">

          <div className="step">
            <span>1</span>
            <h3>Upload Job Description</h3>
            <p>Paste your job requirements.</p>
          </div>

          <div className="step">
            <span>2</span>
            <h3>Upload CVs</h3>
            <p>Add up to 5 resumes for screening.</p>
          </div>

          <div className="step">
            <span>3</span>
            <h3>AI Screening</h3>
            <p>Our AI analyzes and ranks candidates instantly.</p>
          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="cta">

        <h2>Hire Smarter With AI</h2>

        <p>
          Stop wasting hours reviewing resumes. Let AI find the best candidates for you.
        </p>

        <Link to="/login" className="cta-btn">
          Get Started
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="footer">
        <p>© 2026 HireNaija AI Recruiter</p>
      </footer>

    </div>
  );
}