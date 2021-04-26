import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import stylesc from '../styles/login.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import Image from 'next/image'
import Link from 'next/link'

const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {
            // console.log('token: ', token)
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log('user: ', users.data)
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <div className={styles.padding}>
                    <div className={stylesc.card}>
                        <div>
                            <Image src="/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                                width={100}
                                height={100} />
                            <div>
                                <h1>{(user) ? user.username : '-'}</h1>
                                <h3>{(user) ? user.email : '-'}</h3>
                            </div>
                            <div className={stylesc.out}>
                                    <Link href="/logout"><a >Logout</a></Link>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
