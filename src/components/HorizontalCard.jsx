import { Link } from "react-router-dom";

const HorizontalCard = ({
  article_img_url,
  author,
  comment_count,
  created_at,
  title,
  topic,
  article_id,
  votes,
  position,
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(1, 2)
    .join(" ");

  // console.log(position);

  return (
    <section className="w-full overflow-hidden bg-bgcolor p-2 pt-4 flex">
      <div className="relative w-full aspect-[16/9] flex">
        <Link to={`/articles/${article_id}`}>
          <img
            src={article_img_url}
            alt="Article"
            className="w-full h-full object-cover rounded-sm transition-all transform duration-300 hover:scale-105 hover:opacity-80"
          />
        </Link>
      </div>

      <div className="">
        <section>
          <header className="bg-bgcolor mt-2 ml-2">
            <Link
              to={`/articles/${article_id}`}
              className="hover:text-cardcolor"
            >
              <div className="whitespace-normal break-words text-left ">
                {title}
              </div>
            </Link>
          </header>
        </section>

        <div className="bg-bgcolor py-2 p-2 left-0 flex gap-2 justify-start">
          <div className="mr-8">{author}</div>
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
      </div>
    </section>
  );
};

export default HorizontalCard;
