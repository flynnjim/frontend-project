import { Link, useLocation } from "react-router-dom";

const Nav = ({ topics }) => {

  const topicsArray = topics.map((topic) => topic.slug);

  const location = useLocation();

  const linkText =
    "px-4 py-2 text-lg font-semibold block min-h-auto min-w-auto text-sm sm:text-base md:text-2xl lg:text-3xl";

  const currentCategory = location.pathname.split("/").pop();

  const getButtonStyle = (buttonName) => {
    if (topicsArray.includes(currentCategory) && buttonName === "articles") {
      return "bg-fluorescent-yellow rounded-lg";
    }
    return currentCategory === buttonName
      ? "bg-fluorescent-yellow rounded-lg"
      : "bg-buttonpink rounded-lg";
  };



  return (
    <header className="bg-bgcolor rounded-lg p-4 w-full ">
      <nav aria-label="Main Navigation">
        <ul className="flex flex-wrap space-x-4 mx-auto justify-center w-full">
          <li className="transform hover:scale-105 transition-all">
            <Link to="/" className={`${linkText} ${getButtonStyle("")}`}>
              Home
            </Link>
          </li>

          <li className="transform hover:scale-105 transition-all">
            <Link
              to="/articles"
              className={`${linkText} ${getButtonStyle("articles")}`}
            >
              Articles
            </Link>
          </li>
          {topics.map((topic, index) => {
            const uniqueKey = `topic-${index}`
            const topicName = topic.slug;
            return (
              <li key={uniqueKey} className="transform hover:scale-105 transition-all">
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

export default Nav;
