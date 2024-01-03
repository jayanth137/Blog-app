import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import http from '../../../../backend/lib/http';
import { useForm } from 'react-hook-form';

const Create = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ title, author, tags, content }) => {
    const payload = {
      title,
      author,
      tags,
      content,
    };
    await http.post('/api/posts', { data: payload });
    navigate('/');
  };

  return (
    <main className="flex flex-col  card bg-neutral text-neutral-content   ">
      <h1 className="text-6xl font-bold">Create your Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control   ">
          <div className="label">
            <h1 className=" font-bold">Title</h1>
          </div>
          <input
            type="text"
            placeholder="Blog-Title"
            className="input input-bordered w-9/12"
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
            className="input input-bordered w-9/12 "
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
            className="input input-bordered w-9/12 "
            {...register('tags')}
          />
          <div className="label">
            <span className=" font-bold">Enter them seperately with `,`</span>
          </div>
          <textarea
            placeholder="Write your blog here"
            className="textarea textarea-bordered mt-4 textarea-lg  w-9/12 h-80"
            {...register('content')}
          ></textarea>
        </label>
        <div className="mt-8 flex gap-x-2">
          <button className="btn  btn-info" type="submit">
            Publish{' '}
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

export default Create;
