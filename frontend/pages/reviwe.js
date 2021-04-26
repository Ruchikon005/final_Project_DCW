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
                </div>
                <div className={styles.row}>

                    <div className={styles.box}>
                        <Link href="/reviwe_phuket">
                            <a className={styles.boxmanu}>
                                <div>Phuket</div>
                                <div className={styles.Image}>
                                    <Image src="/2019-05_c5e2bc8e94e4910.jpg"
                                        width={568.375}
                                        height={378.875} />
                                </div>
                            </a>


                        </Link>
                        <Link href="/reviwe_cheangmai"><a className={styles.boxmanu}><div>Chiang Mai</div>
                            <Image src="/landscape-of-two-pagoda-at-the-inthanon-mountain-at-sunset--chiang-mai--thailand--642551278-5c34a4a846e0fb000116cc69.jpg"
                                width={568.375}
                                height={378.875} />
                            <div className={styles.Image}>

                            </div></a></Link>
                        <Link href="/reviwe_krabi"><a className={styles.boxmanu}><div>Krabi</div>
                            <div className={styles.Image}>
                                <Image src="/Koh-Poda.jpg"
                                    width={568.375}
                                    height={378.875} />
                            </div></a></Link>
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
