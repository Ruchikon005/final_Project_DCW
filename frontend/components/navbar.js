import Link from 'next/link'
import styles from '../styles/Home.module.css'
const Navbar = () => (

    <div className={styles.footer}>

        <div className={styles.box}>
            <Link href="/" ><a className={styles.boxmanu}>Home</a></Link>
            <Link href="/reviwe"><a className={styles.boxmanu}>Reviwe</a></Link>
            <Link href="/login"><a className={styles.boxmanu}>Login</a></Link>
            <Link href="/profile"><a className={styles.boxmanu} >Profile</a></Link>
        </div>

    </div >
)

export default Navbar

