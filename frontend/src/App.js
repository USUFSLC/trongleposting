import { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";

function App() {
  const [socket, setSocket] = useState(null);
  const [posts, setPosts] = useState([]);
  const postsRef = useRef([]);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("initial-posts", (data) => {
      postsRef.current = data;
      setPosts(postsRef.current);
    });
    socket.on("post-added", (data) => {
      postsRef.current = [...postsRef.current, data];
      setPosts(postsRef.current);
    });
    socket.on("error", (error) => setError(error.errors[0].message));
    setSocket(socket);

    return () => {
      ["initial-posts", "post-added", "error"].map((x) => socket.off(x));
      socket.disconnect();
    };
  }, []);

  const addPost = () => {
    setError("");
    if (socket) {
      socket.emit("new-post", {
        username,
        content
      })
    }
  }

  return (
    <div>
      {posts.map((post) => <p key={post.id}>{post.content}</p>)}
      <input onChange={(e) => setContent(e.target.value)} value={content}></input>
      <input onChange={(e) => setUsername(e.target.value)} value={username}></input>
      <button onClick={addPost}>Post</button>
      {error ? <p>{error}</p> : null}
    </div>
  );
}

export default App;