'use client'
// components/HeroSection.jsx
const HeroSection = () => {
  return (
    <section className="hero-section blood-bg-white">
      <div className="hero-container">
        {/* Main Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Donate Blood, Keep
            <span className="hero-title-accent"> the World Beating</span>
          </h1>

          <p className="hero-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cerullis
            niusque lectus quisque nullamor. Ut augue lacinia quam, id doloris
            nisi ut enim, vel ipsum gravida dolore mollit lobort.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button className="hero-btn-primary">Become a Donor</button>
            <button className="hero-btn-secondary">Learn More</button>
          </div>

          {/* Stats Section */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Lives Saved</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5K+</div>
              <div className="stat-label">Active Donors</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities</div>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <div className="feature-content">
              <h3 className="feature-title">Diamond Bose</h3>
              <p className="feature-desc">Premium blood donation experience</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <div className="feature-content">
              <h3 className="feature-title">Sant Duisabril</h3>
              <p className="feature-desc">Safe & hygienic process</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-content">
              <h3 className="feature-title">Patrice Support</h3>
              <p className="feature-desc">24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 2rem 1rem;
          background: linear-gradient(
            135deg,
            var(--color-base-100) 0%,
            var(--color-base-200) 100%
          );
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-content {
          text-align: center;
        }

        @media (min-width: 768px) {
          .hero-content {
            text-align: left;
          }
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--color-secondary);
        }

        .hero-title-accent {
          color: var(--color-primary);
          display: block;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 3.5rem;
          }
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          color: var(--color-secondary);
          opacity: 0.8;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .hero-buttons {
            justify-content: flex-start;
          }
        }

        .hero-btn-primary {
          background: var(--color-primary);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(183, 27, 28, 0.3);
        }

        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(183, 27, 28, 0.4);
          background: #a01819;
        }

        .hero-btn-secondary {
          background: transparent;
          color: var(--color-primary);
          border: 2px solid var(--color-primary);
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.125rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .hero-btn-secondary:hover {
          background: var(--color-primary);
          color: white;
          transform: translateY(-2px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--color-secondary);
          opacity: 0.7;
          font-weight: 500;
        }

        .hero-features {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .feature-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid var(--color-base-300);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .feature-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .feature-content {
          flex: 1;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-secondary);
          margin-bottom: 0.5rem;
        }

        .feature-desc {
          color: var(--color-secondary);
          opacity: 0.7;
          line-height: 1.5;
          font-size: 0.9rem;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            max-width: 280px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
            padding: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
