import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/reviwe.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Reviwes({ token }) {

    return (
        <Layout>
            <Head>
                <link rel="shortcut icon" href="/facebook.png" />
                <title>First Page</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <div className={styles.padding}>
                    <h1>Travel Reviwe</h1>
        No login required!
      </div>
                <div className={styles.footer}>

                    <div className={styles.box}>
                        <Link href="/reviwe_phuket">
                            <a className={styles.boxmanu}>
                                <div>Phuket</div>
                                <div className={styles.Image}>
                                    <Image  src="/facebook.png"
                                        width={25}
                                        height={25} />
                                </div>
                            </a>


                        </Link>
                        <Link href="/reviwe_cheangmai"><a className={styles.boxmanu}>Cheangmai</a></Link>
                        <Link href="/reviwe_krabi"><a className={styles.boxmanu}>Krabi</a></Link>
                    </div>

                </div >
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    // console.log("token from cookie: ",cookie.get("token")) 
    // console.log('req: ', req.headers)
    return { props: { token: req.cookies.token || "" } };
}
