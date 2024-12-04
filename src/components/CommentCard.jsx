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
    .slice(0, 5)
    .join(" ");

  return (
    <div className="m-2 p-6 rounded-lg shadow-lg mb-4 w-[250px] h-[450px] border-4 border-cardcolor bg-color">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{author} ✍️</h3>
        <p className="text-sm text-gray-500">{formatDate} GMT 🕒</p>
        <p className="text-sm text-gray-500">{votes} 👍</p>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">{body}</p>
      </div>

      {selectedUser === author && (
        <div className="mt-4">
          <button
            onClick={deleteThisComment}
            disabled={deleteButtonDisabled}
            className={`px-4 py-2 text-white rounded-lg 
              ${
                deleteButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } 
              transition-all`}
          >
            Delete Comment
          </button>
          {deleteLabel && (
            <p className="text-red-500 text-sm mt-2">{deleteLabel}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
