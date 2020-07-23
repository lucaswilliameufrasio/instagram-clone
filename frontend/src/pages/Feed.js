import React, { useState, useEffect } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import { PostList } from './FeedStyles';
import './Feed.css';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

export default function Feed() {
    const [feed, setFeed] = useState([]);

    useEffect(() => {
        registerToSocket();

        async function getPosts() {
            const response = await api.get('posts');

            setFeed(response.data);
        }

        getPosts();
    }, []);

    function registerToSocket() {
        const socket = io('http://localhost:7777');

        socket.on('post', newPost => {
            setFeed(feeds => [newPost, ...feeds]);
        });

        socket.on('like', likedPost => {
            setFeed(feeds => feeds.map(post => 
                post._id === likedPost._id ? likedPost : post
                ))
        });
    }

    function handleLike(id) {
        api.post(`/posts/${id}/like`);
    }

    return (
        <PostList>
            {feed.map(post => (
                <article key={post._id}>
                    <header>
                        <div className="user-info">
                            <span>{post.author}</span>
                            <span className="place">{post.place}</span>
                        </div>


                        <img src={more} alt="Mais" />
                    </header>

                    <img src={`http://localhost:7777/files/${post.image}`} alt="" />

                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => handleLike(post._id)}>
                                <img src={like} alt="" />
                            </button>
                            <img src={comment} alt="" />
                            <img src={send} alt="" />
                        </div>
                        <strong>{post.likes} curtidas</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                    </footer>
                </article>
            ))}
        </PostList>
    );
}
