import "./App.css";
import { useEffect, useState } from "react";
import FilteringTable from "./components/UI/Table/FilteringTable";
function App() {
  const [post, setPost] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const fetchPostsHandler = async () => {
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageCount}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
      let loadedPosts = [];

      loadedPosts = data.hits.map((hit, i) => {
        return {
          title: hit["title"],
          author: hit["author"],
          createdAt: hit["created_at"].slice(0, 10),
          url: hit["url"],
        };
      });
      setPost((prev) => {
        return [...prev, ...loadedPosts];
      });
      setPageCount(pageCount + 1);
      // count++;
    } catch {}
  };

  useEffect(() => {
    if (pageCount < 50) {
      const interval = setInterval(() => {
        fetchPostsHandler();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="App">
      {/* <button onClick={fetchPostsHandler}>Click</button> */}
      {/* <Table columns={columns} data={post} /> */}
      <FilteringTable data={post} />
    </div>
  );
}

export default App;
