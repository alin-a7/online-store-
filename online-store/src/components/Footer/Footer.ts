//@ts-ignore
import styles from './Footer.module.css'

export const footer = () => {
  const view: string = `
        <footer>
        <div class="footer">
        <div class="footer-container">
        <div class="footer-block">
          <div class="footer-nav">© 2022</div>
          <a href="https://rs.school/js/" class="rs"></a>
          <a href="https://rs.school/js/" class="footer-nav"
            >Курс «JavaScript/Front-end»</a
          >
        </div>
        <a href="https://github.com/alin-a7" class="footer-nav atr"
          >Designer: alin-a7</a
        >
        </div>
        
      </div>
        </footer>
    `
  return view
}
