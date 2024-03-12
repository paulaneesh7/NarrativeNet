/* eslint-disable react/prop-types */
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";

const Comment = ({ c, userId }) => {

  /* To delete the comment */
  const handleDeleteComment = async () => {
    try {
      const res = await axios.delete(URL + `/api/comments/${c._id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
      // console.log("Comment has been deleted");
    } catch (err) {
      console.log(err);
    }
  };


  // useEffect(() => {
  //   handleDeleteComment();
  // }, [])

  return (
    <div className="px-2 py-2 my-2 bg-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-600">@{c.author}</h3>
        <div className="flex items-center justify-center space-x-3">
          <p className="text-sm text-gray-500">
            {new Date(c.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(c.updatedAt).toString().slice(16, 24)}
          </p>
          {userId === c?.userId ? (
            <div className="flex items-center justify-center space-x-2 cursor-pointer">
              <p onClick={handleDeleteComment}>
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  );
};

export default Comment;
