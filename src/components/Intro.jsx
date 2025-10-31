import styles from './Intro.module.css'

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <h1 className={styles.title}>Learn. Build. Impact.</h1>
        <div className={styles.aboutSection}>
          <div className="badge">ABOUT</div>
          <div className={styles.introLayout}>
            <div className={styles.introContent}>
              <p className={styles.aboutText}>
                I'm a B.S. candidate in Computer Science and Business Administration at Northeastern University, 
                passionate about solving complex, ambiguous problems through data, design, and systems thinking. 
                Beyond academics and work, I enjoy exploring personal projects in data analysis, predictive 
                modeling, and technology-driven problem solving.
              </p>
              <p className="muted">
                Got something interesting? <a href="mailto:budhi.d@northeastern.edu">Let's connect</a>.
              </p>
            </div>
            <div className={styles.headshotContainer}>
              <img 
                src="/files/headshot.png" 
                alt="Dishant Budhi" 
                className={styles.headshot}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


