import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../LogIn/login.css'

export const Wall = () => {

    const [posts, setPosts] = useState([]);
    const urlGetPost = 'http://localhost:3000/api/posts';

    const getDataPost = async () => {

        
        const result = await axios.get(urlGetPost);
        const resultData = (await result).data;
        setPosts(resultData);

    }

    useEffect( ()=>{

        getDataPost();

    } , [] );


    return (
        <>
            <div className='container'>

                <h1>My Feed</h1>

                <ul className=' mt-3 '>

                    {
                        posts.map((x) => (

                            <li className='ulPosts'  key={x.id} >
                                <div className="card mb-3" >
                                    <img src={`data:image/png;base64,${x.img_base64}`} className="card-img-top" alt='Foto de Post' />
                                    <div className="card-body">
                                        <p className="card-text">{x.description}</p>
                                    </div>
                                </div>
                            </li>

                        )
                        )
                    }


                </ul>

            </div>

        </>
    )
}
