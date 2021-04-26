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
                <div className={styles.formath}>
                    <div className={styles.h}>
                        <div>
                            <Image src="/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                                width={30}
                                height={30} />
                        </div>
                        {(reviwe) ? reviwe.author : '-'}

                    </div>
                    <div className={styles.content} >
                        {(idEdit !== reviwe.id) ?
                            reviwe.content :
                            (<input type="text"
                                name="name"
                                onChange={(e) => setContent(e.target.value)}
                            />)
                        }

                    </div>
                    <div className={styles.mar}>
                        <button id="bte"  disabled={token === ""} onClick={() => editContent(reviwe, reviwe.id)}>Edit</button>
                        <button id="btu" disabled={token === ""} onClick={() => deleteContent(reviwe.id)}>Delete</button>
                    </div><hr />
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
                <div>
                  
                </div>
                
                <div className={styles.section}>
                    <h1>Phuket</h1>
                </div>
                <div className={styles.detial}>
                    <div className={styles.areaimage}>

                        <Image src="/2019-05_c5e2bc8e94e4910.jpg"
                            width={500}
                            height={344} />

                        <div >

                            <Image src="/p1.jpg"
                                width={200}
                                height={133.5} />

                            <Image src="/dFQROr7oWzulq5FZUEh3LKhS9932LER9QK5rnr5uzRS6hA0e4k7JIO6Gw94otMc1f9K.jpg"
                                width={300}
                                height={133.5} />
                        </div>
                    </div>
                    <div className={styles.comment}>
                        <ul className={styles.scroll}>{printContents(data.list)} </ul>

                        
                            <div className={styles.display} disabled={token === ""}>
                                <h2 >Comment</h2>
                                <textarea className={styles.text_area} disabled={token === ""} type="text" onChange={(e) => setContent(e.target.value)} />
                                <div>
                                    <button id="btp" disabled={token === ""} onClick={() => addContent(content)}>Post</button>
                                </div>

                            </div>
                            <div className={styles.display} disabled={token !== ""}>
                                <Link href="/login">
                                    <a className={styles.loginadd}>
                                        <div >
                                            Log in to add a reviews
                                        </div>
                                    </a>
                                </Link>
                            </div>

                    </div>

                </div>




            </div>
            <Navbar />  
        </Layout>
    )
}

export default Reviwe_phuket

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


