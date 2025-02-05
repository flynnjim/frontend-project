import { Link } from "react-router-dom";

const VerticalCard = ({
  article_img_url,
  author,
  comment_count,
  created_at,
  title,
  topic,
  article_id,
  votes,
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 1)
    .join(" ");

  return (
    <section className="w-full overflow-hidden bg-bgcolor p-2 pt-4">
      <div className="relative w-full aspect-[16/9]">
        <Link to={`/articles/${article_id}`}>
          <img
            src={article_img_url}
            alt="Article"
            className="w-full h-full object-cover rounded-sm transition-all transform duration-300 hover:scale-105 hover:opacity-80"
          />
        </Link>
      </div>
      <section>
        <header className="bg-bgcolor mt-2 ml-2">
          <Link to={`/articles/${article_id}`} className="hover:text-cardcolor">
            <div className="whitespace-normal break-words text-left ">
              {title}
            </div>
          </Link>
        </header>
      </section>

      <div className="bg-bgcolor py-2 p-2 left-0 flex gap-2 justify-start">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">💬</span> {comment_count}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">🕒</span> {formatDate}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">👍</span> {votes}
        </p>
      </div>
      <div className="text-left ml-2">{author}</div>
    </section>
  );
};

export default VerticalCard;
