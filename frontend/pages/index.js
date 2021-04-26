import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export default function Home({ token }) {

  return (
    <Layout>
      <Head>
        <title>First Page</title>
      </Head>
      <div className={styles.container_b}>
        <Navbar />
        <div className={styles.padding}>
            <h1>Travel Reviwes</h1>
      </div>
      </div>
    </Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
