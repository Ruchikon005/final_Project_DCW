import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'
import Link from 'next/link'
import Image from 'next/image'

const URL1 = `http://localhost/api/reviwes_pk`
const fetcher = (URL1) => axios.get(URL1).then(res => res.data)

const Reviwe_phuket = ({ token }) => {

    const [user, setUser] = useState('')
    const [reviwe, setReviwe] = useState('')
    const [content, setContent] = useState('')
    const [idEdit, setIdEdit] = useState(0)


    const { data, error } = useSWR(URL1, fetcher)
    if (!data) return <div>Loading...</div>
    console.log('Home', data);

    const printContents = (reviwes) => {
        console.log('reviwe: ', reviwes)
        if (reviwes && reviwes.length)

            return (reviwes.map((reviwe, index) =>

            (<li key={index}>
                <div>
                    {(reviwe) ? reviwe.author : '-'}
                </div>
                {(idEdit !== reviwe.id) ?
                    reviwe.content :
                    (<input type="text"
                        name="name"
                        onChange={(e) => setContent(e.target.value)}
                    />)
                }
                <div classname={styles.ho} disabled={token === ""}>
                    <button classname={styles.display} disabled={token === ""} onClick={() => editContent(reviwe, reviwe.id)}>Edit</button>
                    <button classname={styles.display} disabled={token === ""} onClick={() => deleteContent(reviwe.id)}>Delete</button>

                </div>
            </li>
            )

            ))
        else {
            (<h2>content</h2>)
        }
    }

    const editContent = (reviwe, id) => {
        setIdEdit(id)
        if (+idEdit === +id) { //Press Edit again
            if (+reviwe.id === +id) {
                updateContent(reviwe.id)
            }
            setIdEdit(0)
        }
    }

    const getContent = async (id) => {

        let reviwes = await axios.get(`${URL1}/${id}`);
        setContent({
            content: reviwes.data.content,
            author: reviwes.data.author

        });


    }

    const addContent = async (content) => {

        let reviwes = await axios.post(URL1, { content },
            {
                headers: { Authorization: `Bearer ${token}` }
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
                <title>reviwe_phuket</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <div className={styles.section}>
                    <h1>Phuket</h1>
                </div>
                <div className={styles.detial}>
                    <Image src="/2019-05_c5e2bc8e94e4910.jpg"
                        width={25}
                        height={25} />
                </div>

                <div className={styles.fixed}>
                    <ul className={styles.scroll}>{printContents(data.list)} </ul>
                    <div className={styles.display} disabled={token === ""}>
                        <h2 >Comment</h2>
                        <textarea className={styles.text_area} disabled={token === ""} type="text" onChange={(e) => setContent(e.target.value)} />
                        <div>
                            <button disabled={token === ""} onClick={() => addContent(content)}>Post</button>
                        </div>


                    </div>
                    <div className={styles.display} disabled={token !== ""}>
                        <Link href="/login"><a>Login </a></Link>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Reviwe_phuket

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


