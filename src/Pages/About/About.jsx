import "./About.css";

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <h1>About Cotton Life</h1>

        <p>
          Discover quality fashion, modern style,
          and products made for your everyday look.
        </p>
      </section>

      <section className="contact-section">
        <h2>Contact Us</h2>

        <div className="contact-info">
          <div>
            <h3>Phone</h3>
            <p>01202937218</p>
            <p>01203555561</p>
          </div>

          <div>
            <h3>Email</h3>
            <p>info@fashion.com</p>
          </div>
        </div>
      </section>

      <section className="branches-section">
        <h2>Our Branches</h2>

        <div className="branches">

          <div className="branch-card">
            <h3>ismailia</h3>
            <p>
              elzohor,
              ismailia, Egypt
            </p>
          </div>

          <div className="branch-card">
            <h3>Ismailia</h3>
            <p>
              eshrini,
              Ismailia, Egypt
            </p>
          </div>

          <div className="branch-card">
            <h3>Alexandria</h3>
            <p>
              78 Example Street,
              Alexandria, Egypt
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default About;