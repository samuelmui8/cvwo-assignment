import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status, fetchPostsAsync, selectPosts, selectStatus } from './postSlice';
import Post from './Post';
import PostForm from './PostForm';

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  let contents;

  if (status !== Status.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <div className="card">
      <div className="card-body">
        <h3>{status}</h3>
        <PostForm />
        {posts && posts.map(post => {
          return <div key={post.id} style={{margin:"5em"}}>
            <Post 
              dispatch={dispatch}
              post={post}
            />
          </div>
        })}

      </div>
    </div>
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  )
}

export default Posts