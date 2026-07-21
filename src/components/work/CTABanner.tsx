import styles from './CTABanner.module.css'

export default function CTABanner() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <p className={styles.text}>
          Got something interesting?{' '}
          <a href="mailto:budhi.d@northeastern.edu">Let&apos;s connect.</a>
        </p>
      </div>
    </section>
  )
}
