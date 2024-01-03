import http from '../../../../backend/lib/http';
import formatDate from '../../../../backend/lib/formatDate';
import Navbar from '../../components/Navbar';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const colorClasses = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/api/posts');
      setPosts(data.data.posts);
      console.log(data.posts);
    }
    fetchData();
  }, []);
  return (
    <main className="flex flex-col md:container md:mx-auto ">
      <Navbar />
      <div>
        <h1 className="text-4xl mt-8">
          Explore the Journey, Embrace the Story{' '}
          <span className="italic text-sm"> - LOG.blogs</span>
        </h1>
      </div>
      <div className="scrollable-div rounded-3xl m-8">
        {posts.map((post, index) => {
          return (
            <div
              key={post._id}
              className={`card ${
                colorClasses[index % colorClasses.length]
              }  text-neutral-content m-4`}
            >
              <Link to={`/posts/${post._id}`}>
                <h1 className="text-4xl font-bold text-left">
                  {post.title} -{' '}
                  <span className="italic text-sm">{post.author}</span>{' '}
                </h1>
              </Link>
              <p className="text-left line-clamp-4 m-4">{post.content}</p>
              <span className="italic  text-left">
                {formatDate(post.createdAt)}
              </span>{' '}
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
};

export default Home;
