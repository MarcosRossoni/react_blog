import React, {useEffect, useState} from 'react';
import "./Home.css"
import {Link} from "react-router-dom";
import blogFetch from "../axios/config.js";

const Home = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async () => {

        try {
            const response = await blogFetch.get("/posts")

            const data = response.data
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])


    return (
        <div className="home">
            <h1>Ultimos Posts</h1>
            {posts.length === 0 ? <p>Carregando...</p> : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/post/${post.id}`} className="btn">Ler mais</Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;