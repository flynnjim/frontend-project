import { useState } from "react";

const ArticleActionComponent = ({
  body,
  getArticleComments,
  isLoadingComments,
  buttonDisplay,
  created_at,
  currentVotes,
  comment_count,
  voteFailed,
  voteFailedMessage,
  addVote,
}) => {
  const [showCommentsClicked, setShowCommentsClicked] = useState(false);

  const [isVoting, setIsVoting] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleVote = async () => {
    if (cooldown) return;

    setIsVoting(true);
    setCooldown(true);

    try {
      await addVote();
    } catch (error) {
      console.error("Vote failed", error);
    } finally {
      setIsVoting(false);
      setTimeout(() => setCooldown(false), 3000);
    }
  };

  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(1, 2)
    .join(" ");

  return (
    <section className="rounded-lg p-2 w-full">
      <section className="bg-bgcolor rounded-md mt-6 text-xs">
        <div className="flex flex-wrap justify-left gap-4 items-center">
          <p className="md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 mb-2">
            <span className="font-semibold"></span>🕒 {formatDate}
          </p>

          <p
            className={`md:text-2xl lg:text-3xl xl:text-4xl mb-2 cursor-pointer  hover:border-b-4 hover:border-cardcolor hover:text-cardcolor ${
              cooldown ? "text-gray-400" : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={handleVote}
          >
            <span className="font-semibold">👍 </span>
            {isVoting ? "Voting..." : currentVotes} Vote
          </p>
          <p
            className="md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 pt-1 pb-1 cursor-pointer mb-2 hover:border-b-4 hover:border-cardcolor hover:text-cardcolor rounded-sm"
            onClick={() => {
              getArticleComments();
              setShowCommentsClicked(!showCommentsClicked);
            }}
            disabled={isLoadingComments}
          >
            <span className="font-semibold"></span>💬 {buttonDisplay} |{" "}
            {comment_count}
          </p>
          {voteFailed && (
            <p className="text-sm text-red-500 mt-4">{voteFailedMessage}</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default ArticleActionComponent;
