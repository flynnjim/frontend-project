import CommentCard from "./CommentCard";

const CommentList = ({
  articleComments,
  successfulDeletedComment,
  isLoadingComments,
  displayComments,
  commentsFound,
  username,
  handleRemoveContentDisplay,
  selectedUser,
}) => {
  return (
    <>
      {!commentsFound && (
        <p className="text-gray-500 text-sm mt-2">No comments found</p>
      )}

      {isLoadingComments && (
        <p className="text-gray-500 text-sm mt-2">Loading comments...</p>
      )}

      {displayComments && commentsFound && (
        <>
          {successfulDeletedComment && (
            <p className="text-green-500 text-sm mt-2">
              Comment was successfully deleted
            </p>
          )}

          <ul id="item-list" className="space-y-4 mt-4">
            {articleComments.map((comment) => (
              <li key={comment.comment_id}>
                <CommentCard
                  article_id={comment.article_id}
                  author={comment.author}
                  comment_count={comment.comment_count}
                  body={comment.body}
                  comment_id={comment.comment_id}
                  created_at={comment.created_at}
                  votes={comment.votes}
                  username={username}
                  handleRemoveContentDisplay={handleRemoveContentDisplay}
                  selectedUser={selectedUser}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentList;
