import { useState } from "react";

const DropDown = ({
  setArticlesData,
  setCommentCountSelected,
  articlesData,
}) => {
  const [sortBySelected, setSortBySelected] = useState("created_at");
  const [orderSelected, setOrderSelected] = useState("DESC");

  const handleOrderChange = (event) => {
    const value = event.target.value;
    setOrderSelected(value);

    const sortedArticles = [...articlesData].sort((a, b) => {
      if (sortBySelected === "comment_count") {
        return value === "ASC"
          ? a.comment_count - b.comment_count
          : b.comment_count - a.comment_count;
      } else if (sortBySelected === "created_at") {
        return value === "ASC"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBySelected === "votes") {
        return value === "ASC" ? a.votes - b.votes : b.votes - a.votes;
      }
      return 0;
    });

    setArticlesData(sortedArticles);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBySelected(value);

    if (value === "comment_count") {
      setCommentCountSelected(true);
    } else {
      setCommentCountSelected(false);
    }

    const sortedArticles = [...articlesData].sort((a, b) => {
      if (value === "comment_count") {
        return orderSelected === "ASC"
          ? a.comment_count - b.comment_count
          : b.comment_count - a.comment_count;
      } else if (value === "created_at") {
        return orderSelected === "ASC"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (value === "votes") {
        return orderSelected === "ASC" ? a.votes - b.votes : b.votes - a.votes;
      }
      return 0;
    });

    setArticlesData(sortedArticles);
  };

  return (
    <div className="flex flex-row items-center justify-center bg-bgcolor rounded-2xl p-4 w-full">
      <div className="flex flex-col items-center mx-4">
        <label className="text-black text-center font-medium">Sort By</label>
        <select
          value={sortBySelected}
          onChange={handleSortChange}
          className="w-48 p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
      </div>
      <div className="flex flex-col items-center mx-4">
        <label className="text-black text-center font-medium">Order</label>
        <select
          value={orderSelected}
          onChange={handleOrderChange}
          className="w-48 p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default DropDown;
