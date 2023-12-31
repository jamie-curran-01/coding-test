import React, { useState , useEffect } from "react";
import Layout from "../components/Layout";

type Props = {
  posts: [Post]
}

type Post = {
  _id: String;
  title: String;
  content: String;
}
export async function getServerSideProps() {
  try {
    let response = await fetch('https://coding-test-bii8-git-main-founders-twilighttech.vercel.app/api/getPosts');
    let posts = await response.json();
    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };

  } catch (e) {
    console.error(e);
    return {
    };
  }
}

export default function Posts(props: Props) {
  const [posts, setPosts] = useState ( ()=>props.posts);
  const handleDeletePost = async (postId: string) => {
    try {
      let response = await fetch(
        "https://coding-test-bii8-git-main-founders-twilighttech.vercel.app/api/deletePost?id=" + postId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };
  return (

    <Layout>
      <div className="row">
        <div className="col">

        </div>
      <div className="posts-body col">

        <h1 className="posts-body-heading">Added Posts</h1>
        {posts != null && posts.length > 0 ? (
          <ul className="posts-list">
            {posts.map((post, index) => {
              return (
                <li key={index} className="post-item">
                  <div className="post-item-details">
                    <h2>{post.title}</h2>
  
                    <p>{post.content}</p>
                  </div>
                  <div className="post-item-actions">
                    <a href={`/posts/${post._id}`}>Edit</a>
                    <button onClick={() => handleDeletePost(post._id as string)}>
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="posts-body-heading">Ooops! No posts added so far</h2>
        )}
        </div>
        <div className="col">

        </div>
      </div>
      <style jsx>
        {`
          .posts-body {
            width: 400px;
            margin: 10px auto;
          }
          .posts-body-heading {
            font-family: sans-serif;
          }
          .posts-list {
            list-style-type: none;
            display: block;
          }
          .post-item {
            width: 100%;
            padding: 10px;
            border: 1px solid #d5d5d5;
          }
          .post-item-actions {
            display: flex;
            justify-content: space-between;
          }
          .post-item-actions a {
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
}