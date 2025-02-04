import { Link, useLocation } from "react-router-dom";

const Nav = ({ topics }) => {
  const topicsArray = topics.map((topic) => topic.slug);

  const location = useLocation();
  console.log(topicsArray);

  const linkText =
    "px-2 py-2 text-fluid font-semibold block min-h-auto min-w-auto hover:border-b-4 hover:border-cardcolor cursor-pointer";

  const currentCategory = location.pathname.split("/").pop();

  const getButtonStyle = (buttonName) => {
    // if (topicsArray.includes(currentCategory) && buttonName === "articles") {
    //   return "border-b-4 border-cardcolor";
    // }
    return currentCategory === buttonName ? "border-b-4 border-cardcolor" : "";
  };

  return (
    <header className="bg-bgcolor pt-2 w-full capitalize">
      <nav aria-label="Main Navigation">
        <ul className="flex flex-wrap mx-auto justify-start w-full divide-x-2 divide-black-100">
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

export default Nav;
