import { useState } from "react";
import { deleteComment } from "../../api";

const CommentCard = ({
  author,
  body,
  comment_id,
  created_at,
  votes,
  username,
  handleRemoveContentDisplay,
  selectedUser,
}) => {
  const [deleteLabel, setDeleteLabel] = useState("");
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const deleteThisComment = () => {
    setDeleteLabel("deleting comment");
    if (username === author) {
      setDeleteButtonDisabled(true);

      deleteComment(comment_id)
        .then(() => {
          handleRemoveContentDisplay(comment_id);
        })
        .catch((err) => {
          setDeleteLabel("failed to delete comment");
        })
        .finally(() => {
          setDeleteButtonDisabled(false);
        });
    } else {
      setDeleteLabel(
        "username does not match, you can only delete your own comments"
      );
    }
  };

  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 1)
    .join(" ");

  return (
    <div className="p-2 mb-2 w-full  bg-color border-b-2 border-black-100 grid grid-cols-[auto,4fr]">
      <img
        src={`/assets/${author}.png`}
        // alt={selectedUser ? `Logged in as ${selectedUser}` : "Login"}
        className=" w-10 h-10 m-2 mr-4 md:w-12 md:h-12 lg:w-15 lg:h-15 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
      />
      <div>
        <div className="flex gap-2 justify-between">
          <h3 className="text-sm font-semibold">{author}</h3>
          <p className="text-sm text-gray-500">🕒 {formatDate}</p>
        </div>

        <div className="mb-4 mt-2 text-left flex flex-col gap-2">
          <p className="text-sm text-gray-700">{body}</p>
          <p className="text-sm text-gray-500">👍 {votes}</p>
        </div>
        <div className="flex justify-evenly"></div>

        <div className="flex gap-2 justify-end">
          {selectedUser === author && (
            <div className="">
              <button
                onClick={deleteThisComment}
                disabled={deleteButtonDisabled}
                className={` px-1 py-1 text-white text-xs rounded-md
              ${
                deleteButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-800"
              } 
              transition-all`}
              >
                Delete Comment
              </button>
              {deleteLabel && (
                <p className="text-red-500 text-xs">{deleteLabel}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
