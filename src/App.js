import { useEffect, useState } from "react";
import Feed from "./components/feed";
import NewFeed from "./components/addFeed";
import "./App.css";
let ws;
async function connectToServer() {
  ws = new WebSocket("wss://news-feed-be-production.up.railway.app/ws");
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (ws.readyState === 1) {
        clearInterval(timer);
        resolve(ws);
      }
    }, 10);
  });
}

function App() {
  const [allNewsFeeds, setAllNewsFeeds] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    (async function () {
      const ws = await connectToServer();
      ws.onmessage = (webSocketMessage) => {
        const messageBody = JSON.parse(webSocketMessage.data);
        if (messageBody.viewAll) {
          const newsFeed = messageBody.news.reverse();
          setAllNewsFeeds((allNewsFeeds) => newsFeed);
        } else
          setAllNewsFeeds((allNewsFeeds) => [messageBody, ...allNewsFeeds]);
        console.log(messageBody);
      };
      ws.send(JSON.stringify({ viewAll: true }));
    })();
  }, []);
  useEffect(() => {
    try {
      if (Object.keys(formData).length) ws.send(JSON.stringify(formData));
    } catch (err) {}
  }, [formData]);
  return (
    <div className="App">
      <p>
        Welcome to your personalized news feed from different concurrent users.
        Each connected user can post their feed and you can see them in your own
        news feed page here.
      </p>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <NewFeed setFormData={setFormData} />
          </div>
          <div className="col-6">
            {allNewsFeeds.map((data) => (
              <Feed data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
