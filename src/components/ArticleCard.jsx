import { Link } from "react-router-dom";

const ArticleCard = ({
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
    .slice(0, 5)
    .join(" ");

  return (
    <section className="w-[350px] h-[630px] rounded-lg overflow-hidden bg-cardcolor p-4 m-2">
      <div className="relative w-full aspect-square">
        <img
          src={article_img_url}
          alt="Article"
          className="w-full h-full object-cover"
        />
      </div>
      <section>
        <header className="h-[30px] bg-bgcolor font-bold 3text-2xl text-left p-2">
          {topic}
        </header>
        <header className="h-[100px] bg-bgcolor text-left p-4">
          <div>{title}</div>
          <div className="font-semibold text-red-500 italic text-center">
            {author}
          </div>
        </header>
      </section>

      <div className="bg-white">
        <div className="bg-bgcolor py-2 p-2 left-0">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">💬</span> {comment_count}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">🕒</span> {formatDate} GMT
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">👍</span> {votes}
          </p>
        </div>
      </div>

      <div className="p-4 bg-bgcolor text-center">
        <Link
          to={`/articles/${article_id}`}
          className="inline-block bg-cardcolor text-gray-800 px-4 py-2 rounded-md font-medium"
        >
          See more details
        </Link>
      </div>
    </section>
  );
};

export default ArticleCard;
