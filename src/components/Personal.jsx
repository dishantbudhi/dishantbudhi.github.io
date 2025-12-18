import styles from './Personal.module.css'
import { personalData } from '../data/personalData'
import Badge from './common/Badge'

/**
 * Personal component - displays personal interests section
 * @param {Object} data - Personal data object (defaults to personalData)
 * @param {string} className - Additional CSS classes
 */
export default function Personal({ data = personalData, className = '' }) {
  return (
    <section className={`${styles.personal} ${className}`}>
      <div className="container">
        {data.intro.title && (
          <h1 className={styles.title}>{data.intro.title}</h1>
        )}
        <div className={styles.aboutSection}>
          {data.intro.badge && <Badge>{data.intro.badge}</Badge>}
          {data.intro.description && (
            <p className={styles.aboutText}>
              {data.intro.description}
            </p>
          )}
        </div>
        
        <div className={styles.contentGrid}>
          {data.image && (
            <div className={styles.imageContainer}>
              <img 
                src={data.image.src}
                alt={data.image.alt}
                className={styles.interestsImage}
              />
            </div>
          )}
          
          <div className={styles.interestsContent}>
            {data.interests?.map((interest, index) => (
              <div key={index} className="reveal" data-reveal>
                {interest.badge && <Badge>{interest.badge}</Badge>}
                {interest.description && (
                  <p className={styles.interestText}>
                    {interest.description}
                  </p>
                )}
                {interest.items && interest.items.length > 0 && (
                  <ul className={styles.interestList}>
                    {interest.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

