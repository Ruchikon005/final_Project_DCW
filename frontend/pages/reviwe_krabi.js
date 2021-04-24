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

const Reviwe_krabi = ({ token }) => {

    const [user, setUser] = useState('')
    const [reviwe, setReviwe] = useState('')
    const [content, setContent] = useState('')
    const [idEdit, setIdEdit] = useState(0)
    import Image from 'next/image'

    const { data, error } = useSWR(URL1, fetcher)
    if (!data) return <div>Loading...</div>
    console.log('Home', data);

    const printContents = (reviwes) => {
        console.log('reviwe: ', reviwes)
        if (reviwes && reviwes.length)
        
            return (reviwes.map((reviwe, index) =>

            (<div key={index}>
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
                <button onClick={() => editContent(reviwe,reviwe.id)}>Edit</button>
                <button disabled={token === ""} onClick={() => deleteContent(reviwe.id)}>Delete</button>
            </div>)

            ))
        else {
            (<h2>content</h2>)
        } 
    }

    const editContent = (reviwe,id) => {
        setIdEdit(id)
        if (+idEdit === +id) { //Press Edit again
            if (+reviwe.id === +id){
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
                <title>reviwe_krabi</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>Krabi</h1>
                {reviwe.content} {reviwe.author}

                <div>
                    <ul>{printContents(data.list)} </ul>

                    <h2>Add Content</h2>

                    Content : <input type="text" onChange={(e) => setContent(e.target.value)}></input>

                    <button disabled={token === ""} onClick={() => addContent(content)}>Add</button>
                </div>
            </div>
        </Layout>
    )
}

export default Reviwe_krabi

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


