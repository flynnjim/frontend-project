import { useState } from "react";
import { ClickAwayListener } from "@mui/material";

const DropDown = ({ setArticlesData, articlesData }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSortChange = (option) => {
    setShowDropdown(false);

    const sortedArticles = [...articlesData].sort((a, b) => {
      switch (option) {
        case "date_desc":
          return new Date(b.created_at) - new Date(a.created_at);
        case "date_asc":
          return new Date(a.created_at) - new Date(b.created_at);
        case "comments_desc":
          return b.comment_count - a.comment_count;
        case "comments_asc":
          return a.comment_count - b.comment_count;
        case "votes_desc":
          return b.votes - a.votes;
        case "votes_asc":
          return a.votes - b.votes;
        default:
          return 0;
      }
    });

    setArticlesData(sortedArticles);
  };

  return (
    <div className="bg-bgcolor flex justify-end pr-4 items-center relative">
      <span
        className="text-sm md:text-xl font-semibold mr-2 cursor-pointer hover:text-cardcolor"
        onClick={toggleDropdown}
      >
        Sort
      </span>
      <img
        src="/assets/sort.png"
        alt="Sort"
        className="w-[4vw] h-[4vw] md:w-[2rem] md:h-[2rem] min-w-[1rem] min-h-[1rem] cursor-pointer hover:opacity-50 transition-all duration-300 ease-in-out"
        onClick={toggleDropdown}
      />

      {showDropdown && (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
          <div className="absolute right-0 top-5 md:top-9 mt-2 bg-white border rounded-md shadow-md w-42 md:w-66 z-50 transition-all duration-300 ease-in-out">
            <ul className="text-xs md:text-base text-left">
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("date_desc")}
              >
                Date: Newest to Oldest
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("date_asc")}
              >
                Date: Oldest to Newest
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("comments_desc")}
              >
                Comments: Most to Least
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("comments_asc")}
              >
                Comments: Least to Most
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("votes_desc")}
              >
                Votes: Most to Least
              </li>
              <li
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSortChange("votes_asc")}
              >
                Votes: Least to Most
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default DropDown;
