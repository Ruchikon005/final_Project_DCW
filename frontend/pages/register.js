
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styleshome from '../styles/Home.module.css'
import stylesregister from '../styles/register.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }
    const registerForm = () => (
        <div className={stylesregister.gridContainer}>
            <input type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />

            <input type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
        </div>
    )



    return (
        <Layout>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className={styleshome.container}>
                <Navbar />
                <div className={stylesregister.card}>
                    <h1>Sign Up</h1>
                    <br />
                    {status}
                    <br /><br />
                    <div>
                        {registerForm()}
                    </div>

                    <div>
                        <button className={stylesregister.btnrg} onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
