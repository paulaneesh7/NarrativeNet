/* eslint-disable react/prop-types */

import { IF } from "../url";

const HomePost = ({ post }) => {
  return (
    <div className="flex flex-col w-full p-8 mt-8 space-x-4 bg-gray-200 hover:bg-gray-300 rounded-xl lg:flex-row">
      {/* left */}
      <div className="w-full h-full lg:h-[200px] flex justify-center items-center">
        <img
          src={IF+post.photo}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      {/* right */}
      <div className="flex flex-col w-full lg:w-auto">
        <h1 className="mb-1 text-xl font-bold md:mb-2 md:text-2xl">
          {post.title}.
        </h1>
        <div className="flex items-center justify-between mb-2 mr-8 text-sm font-semibold text-gray-700 md:mb-4 lg:mr-0">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="mr-6 text-sm md:text-lg lg:mr-0">
          {post.description.slice(0, 300)} 
          <span className="font-bold">...Readmore</span>
        </p>
      </div>
    </div>
  );
};

export default HomePost;
