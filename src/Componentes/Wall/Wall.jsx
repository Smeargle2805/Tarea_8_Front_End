import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../Wall/Wall.css'
import { useNavigate } from 'react-router-dom'

export const Wall = () => {
    const [posts, setPosts] = useState([]);
    const urlGetPost = 'http://localhost:3000/api/posts';

    const getDataPost = async () => {
        try {
            const result = await axios.get(urlGetPost);
            const resultData = result.data;
            setPosts(resultData);
        } catch (error) {
            console.error('Error al obtener datos del servidor:', error);
        }
    };

    const navigate = useNavigate();

    const crearPost = () => {

        navigate('/crearPost');

    }

    useEffect(() => {
        getDataPost();
    }, []);

    const formatDate = (createdAt) => {
        try {
          const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          };
    
          const formattedDate = new Date(createdAt).toLocaleDateString('en-US', options);
          return formattedDate;
        } catch (error) {
          console.error('Error al formatear la fecha:', createdAt, error);
          return 'Fecha inválida';
        }
      };

    return (
        <>

            <div>
                <nav className="navbar navbar-expand-lg" id='navbar'>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src="/twitter.png" alt="Twitter Logo" className="twitter-logo" id="twitter-logo" />
                        </a>
                        <h1 className='text-center' id="feed-title">Twitter</h1>
                        <button className="btn btn-primary btn-create-post" onClick={crearPost} id="create-post-btn">
                            Crear Post
                        </button>
                    </div>
                </nav>

                <div className='container' id='muro'>
                    <ul className='list-unstyled mt-3' id='posts-list'>
                        {posts.map((post) => (
                            <li className='ulPosts mb-3' key={post.id} id={`post-${post.id}`}>
                                <div className='card' id={`card-${post.id}`}>
                                    <div className='card-body' id={`card-body-${post.id}`}>
                                        <p className='card-text-user' id={`post-user-${post.id}`}>{post.user_name}
                                        </p>
                                        <p className='card-text-desc' id={`post-description-${post.id}`}>{post.description}
                                        </p>
                                        <p className='card-text-date' id={`post-date-${post.id}`}>{formatDate(post.create_date)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>

    )
}

export default Wall;
