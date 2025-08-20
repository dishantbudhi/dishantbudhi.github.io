import styles from './Intro.module.css'

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <h1 className={styles.title}>Learn. Build. Impact.</h1>
        <div className={styles.aboutSection}>
          <div className="badge">ABOUT</div>
          <p className={styles.aboutText}>
            As a B.S. candidate in Computer Science and Business Administration at Northeastern, I'm drawn to solving messy,
            ambiguous problems through data, design, and systems thinking. Outside of work, I explore personal projects in data
            analysis and predictive modeling.
          </p>
          <p className="muted">
            Got something interesting? <a href="mailto:budhi.d@northeastern.edu">Let's connect</a>.
          </p>
        </div>
      </div>
    </section>
  )
}


