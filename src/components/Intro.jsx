import styles from './Intro.module.css'

export default function Intro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <h1 className={styles.title}>Curious. Analytical. Grounded.</h1>
        <div className={styles.aboutSection}>
          <div className="badge">ABOUT</div>
          <p className={styles.aboutText}>
            I am a Computer Science and Business Administration student at Northeastern University, focused on the intersection of 
            technology and strategy. I'm drawn to understanding how systems operate end-to-end and to contributing to solutions 
            that are practical, durable, and well considered.
          </p>
          <p className={styles.aboutText}>
            Through coursework, professional experience, and projects, I've developed a disciplined approach to problem-solving. 
            I focus on asking the right questions, identifying root causes, and iterating toward better outcomes. I value clarity 
            of thought, intentional decision-making, and steady progress.
          </p>
          <p className="muted">
            Got something interesting? <a href="mailto:budhi.d@northeastern.edu">Let's connect</a>.
          </p>
        </div>
      </div>
    </section>
  )
}


