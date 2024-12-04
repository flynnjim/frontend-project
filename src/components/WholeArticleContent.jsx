import { useState } from "react";

const WholeArticleContent = ({
  title,
  article_img_url,
  author,
  comment_count,
  created_at,
  currentVotes,
  voteFailed,
  voteFailedMessage,
  body,
  addVote,
}) => {
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

  const formatDate =
    new Date(created_at)
      .toString()
      .split(" ")
      .slice(0, 5)
      .join(" ")
      .slice(0, -3) + " GMT";

  return (
    <>
      <section>
        <header className="h-[60px] bg-bgcolor text-center text-4xl sm:text-2xl md:text-3xl lg:text-4xl overflow-hidden text-ellipsis pb-10 underline text-gray-600">
          {title}
        </header>
      </section>

      <div className="flex flex-col custom:flex-row items-start gap-4 mt-6">
        <section className="relative custom:w-2/5">
          <img
            src={article_img_url}
            alt="Article"
            className="w-full h-full object-cover rounded-md"
          />
        </section>

        <section className="flex-1 flex flex-col items-center justify-center px-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700">
            {body}
          </p>
          <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-6 text-red-500 font-bold italic">
            {author}
          </p>
        </section>
      </div>

      <section className="p-4 bg-bgcolor shadow-md rounded-md mt-6">
        <div className="flex flex-wrap justify-end">
          <p className="text-3xl text-gray-700 mr-6 mb-2">
            <span className="font-semibold"></span>🕒 {formatDate}
          </p>
          <p className="text-3xl text-gray-700 mr-6 mb-2">
            <span className="font-semibold"></span>💬 {comment_count}
          </p>
          <p
            className={`text-3xl mr-6 mb-2 cursor-pointer ${
              cooldown
                ? "text-gray-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={handleVote}
          >
            <span className="font-semibold">👍 </span>
            {isVoting ? "Voting..." : currentVotes}
          </p>
          {voteFailed && (
            <p className="text-sm text-red-500 mt-4">{voteFailedMessage}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default WholeArticleContent;
