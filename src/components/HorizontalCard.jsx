import { Link } from "react-router-dom";

const HorizontalCard = ({
  article_img_url,
  comment_count,
  created_at,
  title,
  article_id,
  votes,
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(1, 2)
    .join(" ");

  return (
    <Link to={`/articles/${article_id}`}>
      <section className="w-full overflow-hidden bg-bgcolor p-2 pt-4 flex">
        <div className="relative w-full aspect-[16/9] flex">
          <img
            src={article_img_url}
            alt={`image for article ${article_id}`}
            className="w-full h-full object-cover rounded-sm transition-all transform duration-300 hover:scale-105 hover:opacity-80"
          />
        </div>

        <div className="">
          <section>
            <header className="bg-bgcolor mt-2 ml-2">
              <div className="whitespace-normal break-words text-left ">
                {title}
              </div>
            </header>
          </section>

          <div className="bg-bgcolor py-2 p-2 left-0 flex gap-2 justify-start">
            <p className="text-sm text-gray-700">
              <h1 className="font-semibold">💬</h1> {comment_count}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">🕒</span> {formatDate}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">👍</span> {votes}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default HorizontalCard;
