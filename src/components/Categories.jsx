import { Link, useLocation } from "react-router-dom";

const Categories = ({ topics }) => {
  const linkText =
    "px-4 py-2 text-lg font-semibold block min-h-auto min-w-auto text-sm sm:text-base md:text-2xl lg:text-3xl";

  const location = useLocation();

  const currentCategory = location.pathname.split("/").pop();

  const getButtonStyle = (buttonName) => {
    return currentCategory === buttonName
      ? "bg-fluorescent-yellow rounded-lg"
      : "bg-buttonpink rounded-lg";
  };

  return (
    <header className="bg-cardcolor rounded-lg p-4 w-full">
      <nav aria-label="Category Navigation">
        <ul className="flex space-x-10 mx-auto justify-center w-full">
          <li className="mb-4 md:mb-0">
            <h2 className="text-center text-xl md:text-2xl font-bold pt-2">
              Categories
            </h2>
          </li>

          {topics.map((topic, index) => {
            const uniqueKey = `topic-${index}`;
            const topicName = topic.slug;
            return (
              <li
                key={uniqueKey}
                className="transform hover:scale-105 transition-all"
              >
                <Link
                  to={`/categories/${topicName}`}
                  className={`${linkText}
                 ${getButtonStyle(topicName)}`}
                >
                  {topicName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Categories;
