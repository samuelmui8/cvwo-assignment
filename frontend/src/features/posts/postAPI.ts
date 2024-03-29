import { PostFormData, PostsState } from "./postSlice";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return {} as PostsState;
    });
}

export async function createPost(payload: PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return {} as PostsState;
    });
}
