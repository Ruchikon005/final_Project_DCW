import Link from 'next/link'
import styles from '../styles/Home.module.css'
const Navbar = () => (
    
    <div className={styles.footer}>
        
        <div className={styles.box} id = 'text'>
            <Link href="/" >
                <div className = {styles.boxmanu}>Home</div>
                </Link>
            <Link href="/register"><div className = {styles.boxmanu}>Register</div></Link>
            <Link href="/login"><div className = {styles.boxmanu}> Login </div></Link>
            <Link href="/profile"><div className = {styles.boxmanu}>Profile</div></Link>
            <Link href="/getConfig"><div className = {styles.boxmanu}>Config</div></Link>
            <Link href="/logout"><div className = {styles.boxmanu}>Logout</div></Link>
            <Link href="/foo"><div className = {styles.boxmanu}>foo</div></Link>
        </div>

    </div>
)

export default Navbar 