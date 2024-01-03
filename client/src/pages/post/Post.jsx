import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import http from '../../../../backend/lib/http';
import formatDate from '../../../../backend/lib/formatDate';

const Post = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(
        `https://blog-app-omega-eight.vercel.app/api/posts/${postId}`
      );
      setPost(data.data.post);
    }
    fetchData();
  }, [postId]);

  //Delete post

  const deletePost = async () => {
    await http.delete(`/api/posts/${postId}`);
    Navigate('/');
  };

  return (
    <main className="flex flex-col md:container md:mx-auto card w-96 bg-neutral text-neutral-content ">
      <div className="flex flex-col gap-y-4 justify-center items-start card-body">
        <h1 className="text-6xl font-bold">{post.title}</h1>
        <p className="text-sm italic">{formatDate(post.createdAt)} </p>

        <p className="">{post.content}</p>
        <p className="italic text-sm">~ {post.author}</p>

        <div className="flex gap-x-2">
          <Link to={`/posts/${postId}/edit`} className="btn btn-success ">
            Edit
          </Link>
          <button onClick={deletePost} className="btn btn-error">
            Delete
          </button>
        </div>
        <Link
          to="/"
          className="btn btn-outline btn-info"
          style={{ textDecoration: 'none' }}
        >
          &#8592; Back to Home
        </Link>
      </div>
    </main>
  );
};

export default Post;
