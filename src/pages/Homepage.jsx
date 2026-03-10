import { useState } from "react";
import "../homepage.css";
import Login from "./Login";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="nav">
        <h2 className="logo">HireNaija AI</h2>

        <div className="nav-links">
          <button className="login-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
        </div>
      </nav>


      {/* HERO SECTION */}
      <section className="hero">

        {/* Left text */}
        <div className="hero-text">
          <h1 className="hero-title">
            AI-Powered  
            <span> Candidate Screening</span>
          </h1>

          <p className="hero-sub">
            Instantly analyze, rank and match candidates using smart AI.
            Speed up hiring and eliminate manual CV review.
          </p>

          <button className="hero-cta" onClick={() => setShowLogin(true)}>
            Start Screening
          </button>
        </div>


        {/* Right mock card */}
        <div className="hero-mock">
          <div className="mock-card">
            <h3>AI Screening Results</h3>
            <p className="role">Frontend Developer</p>

            <div className="score green">Samuel — 92%</div>
            <div className="score yellow">Ada — 68%</div>
            <div className="score red">Tunde — 31%</div>
          </div>
        </div>

        {/* Floating background shapes */}
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </section>


      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why HireNaija AI?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>⚡ Instant Screening</h3>
            <p>Upload CVs and let AI evaluate them instantly.</p>
          </div>

          <div className="feature-card">
            <h3>🧠 Smart AI Matching</h3>
            <p>Our AI extracts skills, experience and keywords automatically.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Ranked Candidates</h3>
            <p>Instant suitability categorization — Best, Fair, Poor.</p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="cta">
        <h2>Hire Smarter With AI</h2>
        <p>Let AI do the heavy work. Hire better in minutes.</p>

        <button className="cta-btn" onClick={() => setShowLogin(true)}>
          Get Started
        </button>
      </section>


      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 HireNaija AI</p>
      </footer>


      {/* LOGIN POPUP */}
        {showLogin && (
          <div className="login-modal">
            <div className="login-box login-fullscreen">
              
              {/* Close Button */}
              <span className="close-modal" onClick={() => setShowLogin(false)}>
                ✕
              </span>

              {/* Render your existing Login page */}
              <Login />

              

            </div>
          </div>
        )}

    </div>
  );
}