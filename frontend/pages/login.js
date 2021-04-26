import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styleslogin from '../styles/login.module.css'
import styleshome from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import Image from 'next/image'
import Link from 'next/link'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)

        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }


    }

    const loginForm = () => (
        <div className={styleslogin.gridContainer}>
            <input type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styleshome.container}>
                <Navbar />
                <div className={styleshome.padding}>
                    <div className={styleslogin.card}>
                        <div>
                            <h1>Login</h1>
                        </div>
                        <div>
                            {loginForm()}
                        </div>

                        <button disation={token !== ""} className={styleslogin.btnln} onClick={login}>
                            login
                        </button>
                        <div className={styleslogin.inner} />
                        <div>
                            <button className={styleslogin.btnfb}>
                                <Image src="/facebook.png"
                                    width={25}
                                    height={25} />
                                Login with Facebook
                        </button>
                        </div>
                        <div>
                            <button className={styleslogin.btng}>
                                <Image src="/search.png"
                                    width={15}
                                    height={15} />
                                <a>Login with GOOGLE</a>
                            </button>
                        </div>
                        <div className={styleslogin.notmem}>
                            Not a member ?
                            <div>
                                <Link href="/register" >sign up now</Link>
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
