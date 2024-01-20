import React, {useEffect, useState} from 'react';
import blogFetch from "../axios/config.js";
import {Link} from "react-router-dom";

const Admin = () => {
    const [posts, setPosts] = useState({})

    const getPost = async() => {
        try {
            const response = await blogFetch.get(`/posts`)

            const data = response.data
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])
    return (
        <div className="admin">
            <h1>Gerenciar Posts</h1>
            {posts.length === 0 ? (<p>Carregando...</p>) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link className="btn edit-btn">Editar</Link>
                            <button className="btn delete-btn">Excluir</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Admin;