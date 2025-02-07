import { useState } from "react";
import { addComment } from "../../api";

const CommentForm = ({ article_id, handleNewComment, username }) => {
  const [commentBodyForm, setCommentBodyForm] = useState("");
  const [errorSubmitting, setErrorSubmitting] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [commentBodyLabel, setCommentBodyLabel] = useState("");
  const [successfulCommentPost, setSuccessfulCommentPost] = useState(false);

  const handleCommentBodyChange = (event) => {
    setCommentBodyLabel("");
    setSuccessfulCommentPost(false);
    setCommentBodyForm(event.target.value);
  };

  const submitComment = () => {
    setSuccessfulCommentPost(false);
    setErrorSubmitting(false);

    if (!username || !commentBodyForm) {
      if (!username) {
        setErrorSubmitting(true);
      }
      if (!commentBodyForm) {
        setCommentBodyLabel("Please fill in the comment text.");
      }
    } else {
      setSubmitButtonDisabled(true);

      addComment(article_id, username, commentBodyForm)
        .then((response) => {
          setErrorSubmitting(false);
          setSuccessfulCommentPost(true);
          setCommentBodyForm("");
          const newComment = response.data[0];
          handleNewComment(newComment);
        })
        .catch((err) => {
          setErrorSubmitting(true);
        })
        .finally(() => {
          setSubmitButtonDisabled(false);
          setTimeout(() => {
            setSuccessfulCommentPost(false);
          }, 5000);
        });
    }
  };

  return (
    <div className="rounded-lg w-full mx-auto pb-6">
      <div className="">
        <textarea
          id="body-input"
          value={commentBodyForm}
          aria-label="comment entry form"
          onChange={handleCommentBodyChange}
          placeholder="Write your comment..."
          className="w-full h-20 md:h-40 p-2 rounded-lg resize-none border-2 border-black-100 focus:outline-cardcolor focus:ring-0 focus:outline-solid"
          rows="4"
        />
        {commentBodyLabel && username && (
          <p className="text-red-500 text-sm mt-2 text-left">
            {commentBodyLabel}
          </p>
        )}
      </div>

      {errorSubmitting && (
        <p className="text-red-500 text-sm mb-4 text-left">
          Error submitting the comment. Please ensure you are logged in.
        </p>
      )}

      {successfulCommentPost && (
        <p className="text-green-500 text-sm mb-4">
          Your comment was successfully posted!
        </p>
      )}

      <div className="flex justify-end text-black-500">
        <button
          onClick={submitComment}
          disabled={submitButtonDisabled}
          className={`py-2 text-black rounded-lg text-xs bg-white border-2 border-listcolor hover:bg-listcolor
            ${
              submitButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cardcolor"
            } 
            transition-all`}
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
