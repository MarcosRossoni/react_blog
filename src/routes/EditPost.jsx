import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import blogFetch from "../axios/config.js";

const EditPost = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const {id} = useParams()

    const getPost = async() => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const editPost = async(e) => {
        e.preventDefault()

        const post = {title, body, userId: 1}

        await blogFetch.put(`/posts/${id}`, {
            body:post
        })
    }

    useEffect(() => {
        getPost().then(r => {
            setTitle(r.title)
            setBody(r.body)
        })
    },[])

    return (
        <div className="new-post">
            <h2>Editando: {title}</h2>
            <form onSubmit={(e) => editPost(e)}>
                <div className="form-control">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Digite o título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ""}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Conteúdo:</label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Digite o conteúdo"
                        onChange={(e) => setBody(e.target.value)}
                        value={body || ""}
                    ></textarea>
                </div>
                <input type="submit" value="Editar Post" className="btn"/>
            </form>
        </div>
    );
};

export default EditPost;