import React, {useEffect, useState} from 'react';
import blogFetch from "../axios/config.js";
import {Link} from "react-router-dom";
import "./Admin.css"

const Admin = () => {
    const [editPosts, setEditPosts] = useState([])

    const getPost = async() => {
        try {
            const response = await blogFetch.get(`/posts`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async(id) => {
        await blogFetch.delete(`/posts/${id}`)
        const filteredPosts = editPosts.filter((post) => post.id !== id)
        setEditPosts(filteredPosts)
    }

    useEffect(() => {
        getPost().then(r => {
            setEditPosts(r)
        })
    }, [])
    return (
        <div className="admin">
            <h1>Gerenciar Posts</h1>
            {editPosts.length === 0 ? (<p>Carregando...</p>) : (
                editPosts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link className="btn edit-btn" to={`/posts/edit/${post.id}`}>Editar</Link>
                            <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Excluir</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Admin;