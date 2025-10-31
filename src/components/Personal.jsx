import styles from './Personal.module.css'
import { personalData } from '../data/personalData'

export default function Personal() {
  return (
    <section className={styles.personal}>
      <div className="container">
        <h1 className={styles.title}>{personalData.intro.title}</h1>
        <div className={styles.aboutSection}>
          <div className="badge">{personalData.intro.badge}</div>
          <p className={styles.aboutText}>
            {personalData.intro.description}
          </p>
        </div>
        
        <div className={styles.contentGrid}>
          <div className={styles.imageContainer}>
            <img 
              src={personalData.image.src}
              alt={personalData.image.alt}
              className={styles.interestsImage}
            />
          </div>
          
          <div className={styles.interestsContent}>
            {personalData.interests.map((interest, index) => (
              <div key={index} className="reveal" data-reveal>
                <div className="badge">{interest.badge}</div>
                <p className={styles.interestText}>
                  {interest.description}
                </p>
                <ul className={styles.interestList}>
                  {interest.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

