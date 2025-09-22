import { useEffect, useState } from "react";


export default function PostJson()
{
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`ERROR: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setPosts(data.slice(0,15));
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });


  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  return(
      <ul>
        {posts.map((post) => (
        <li key={post.id}>
            <img
            src={post.url}
            />
        </li>
        ))}
      </ul>
  )
}
