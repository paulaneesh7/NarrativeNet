/* eslint-disable react/prop-types */
import { IF } from "../url";

const ProfilePosts = ({ p }) => {
  return (
    <div className="flex flex-col w-full p-8 mt-8 space-x-4 bg-gray-200 lg:flex-row hover:bg-gray-300 rounded-xl">
      {/* left */}
      <div className="w-full h-full lg:w-[35%] lg:h-[200px] flex justify-center items-center">
        <img
          src={IF + p.photo}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      {/* right */}
      <div className="flex flex-col lg:w-[65%]">
        <h1 className="mb-5 text-xl font-bold md:text-2xl">{p.title}</h1>
        <div className="flex items-center justify-between mb-2 text-sm font-semibold text-gray-500 md:mb-4">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(p.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {p.description.slice(0, 300)}
          <span className="font-bold">...Readmore</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
