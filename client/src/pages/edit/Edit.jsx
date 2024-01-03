import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import http from '../../../../backend/lib/http';

const Edit = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/api/posts/${postId}`);
      reset(data.data.post);
    }
    fetchData();
  }, [postId, reset]);

  const onSubmit = async ({ title, author, tags, content }) => {
    const payload = {
      title,
      author,
      tags,
      content,
    };
    await http.put(`/api/posts/${postId}`, { data: payload });
    navigate(`/posts/${postId}`);
  };

  return (
    <main className="flex flex-col  card bg-neutral text-neutral-content   ">
      <h1 className="text-6xl font-bold">Edit your Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control">
          <div className="label">
            <h1 className=" font-bold">Title</h1>
          </div>
          <input
            type="text"
            placeholder="Blog-Title"
            className="input input-bordered w-9/12 form-input
            "
            {...register('title')}
          />
        </label>
        <label className="form-control  ">
          <div className="label">
            <span className=" font-bold">Author</span>
          </div>
          <input
            type="text"
            placeholder="Jayanth"
            className="input input-bordered w-9/12 form-input
            "
            {...register('author')}
          />
        </label>
        <label className="form-control w-full ">
          <div className="label">
            <span className=" font-bold">Tags</span>
          </div>
          <input
            type="text"
            placeholder="React, Node, Express"
            className="input input-bordered w-9/12 form-input
            "
            {...register('tags')}
          />
          <div className="label">
            <span className=" font-bold">Enter them seperately with `,`</span>
          </div>
          <textarea
            placeholder="Write your blog here"
            className="textarea textarea-bordered mt-4 textarea-lg form-textarea w-9/12 h-80"
            {...register('content')}
          ></textarea>
        </label>
        <div className="mt-8 flex gap-x-2">
          <button className="btn  btn-success" type="submit">
            Save{' '}
          </button>
          <Link
            to="/"
            className="btn btn-outline btn-info"
            style={{ textDecoration: 'none' }}
          >
            &#8592; Back to Home
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Edit;
