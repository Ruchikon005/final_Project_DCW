import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'

const URL1 = `http://localhost/api/reviwes`
const fetcher = (URL1) => axios.get(URL1).then(res => res.data)

const Reviwe = ({ token }) => {

    const [user, setUser] = useState('')
    const [reviwe, setReviwe] = useState('')
    const [content, setContent] = useState('')


    const { data, error } = useSWR(URL1, fetcher)
    if (!data) return <div>Loading...</div>
    console.log('Home', data);

    const printContents = (reviwes) => {
        console.log('reviwe: ', reviwes)
        if (reviwes && reviwes.length)

            return (reviwes.map((reviwe, index) =>

            (<li key={index}>
                {(reviwe) ? reviwe.content : '-'} :
                {(reviwe) ? reviwe.author : '-'} :
                <button onClick={() => getContent(reviwe.id)}>Get</button>
                <button disabled={token === ""} onClick={() => updateContent(reviwe.id)}>Update</button>
                <button disabled={token === ""} onClick={() => deleteContent(reviwe.id)}>Delete</button>
            </li>)

            ))
        else {
            (<h2>content</h2>)
        }
    }
    const getContent = async (id) => {

        let reviwe = await axios.get(`${URL1}/${id}`);
        setContent({
            content: reviwe.data.content,

        });
    }

    const addContent = async (content) => {

        let reviwes = await axios.post(URL1, {content},
            {headers: { Authorization: `Bearer ${token}` }
        });

        mutate(URL1)

    }

    const deleteContent = async (id) => {

        let reviwes = await axios.delete(`${URL1}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        mutate(URL1)
    }

    const updateContent = async (id) => {

        let reviwes = await axios.put(`${URL1}/${id}`, { content })
        mutate(URL1)
    }

    return (
        <Layout>
            <Head>
                <title>Content</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>Content</h1>
                {reviwe.content}

                <div>
                    <ul>{printContents(data.list)} </ul>

                    <h2>Add Student</h2>

                    Content : <input type="text" onChange={(e) => setContent(e.target.value)}></input>

                    <button disabled={token === ""} onClick={() => addContent(content)}>Add</button>
                </div>
            </div>
        </Layout>
    )
}

export default Reviwe

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


