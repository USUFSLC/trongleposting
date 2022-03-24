import { useRef, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { generateGruvboxFromString } from "./utils/generate_gruvbox";
import './App.css';
const ENDPOINT = process.env.ENDPOINT || "ws://localhost:8000";

function App() {
  const [socket, setSocket] = useState(null);
  const [posts, setPosts] = useState([]);
  const postsRef = useRef([]);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  const scrollToBottomOfChat = () => {
    const objDiv = document.getElementById('chat');
    objDiv.scrollTop = objDiv.scrollHeight;
  }  

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("initial-posts", (data) => {
      postsRef.current = data;
      setPosts(postsRef.current);
      scrollToBottomOfChat();
    });
    socket.on("post-added", (data) => {
      postsRef.current = [...postsRef.current, data];
      setPosts(postsRef.current);
      scrollToBottomOfChat();
    });
    socket.on("error", (error) => setError(error.errors[0].message));
    setSocket(socket);

    return () => {
      ["initial-posts", "post-added", "error"].map((x) => socket.off(x));
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setColor(generateGruvboxFromString(username));
  }, [username]);

  const addPost = () => {
    setError("");
    if (socket) {
      socket.emit("new-post", {
        username,
        content
      });
    }
    setContent("");
  }

  return (
    <div className="container" style={{border: `1px solid ${color}`}}>
      <div id="chat" className="chat">
        <p>Welcome!</p>
        {posts.map((post) => <div key={post.id}><span style={{color: generateGruvboxFromString(post.username)}}>{post.username}: </span>{post.content}</div>)}
      </div>
      <div>
        <input placeholder={"Username"} className="input" style={{color}} onChange={(e) => setUsername(e.target.value)} value={username}></input>
        <textarea placeholder={"Message"} className="input" onChange={(e) => setContent(e.target.value)} value={content} rows={1} cols={50}></textarea>
        <div className="button" onClick={addPost}>Post</div>
        {error ? <p>{error}</p> : null}
      </div>
    </div>
  );
}

export default App;