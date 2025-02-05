// import { useState, useEffect } from "react";
// import { getAllArticles } from "../../api";
// import ArticleCard from "./ArticleCard";

// const Trending = () => {
//   const [trendingArticles, setTrendingArticles] = useState([]);
//   const [recentArticles, setRecentArticles] = useState([]);
//   const [mostCommentedArticles, setMostCommentedArticles] = useState([]);
//   const [isPageLoading, setIsPageLoading] = useState(true);

//   useEffect(() => {
//     setIsPageLoading(true);
//     getAllArticles()
//       .then((articles) => {
//         const topArticles = articles
//           .sort((a, b) => b.votes - a.votes)
//           .slice(0, 6);
//         setTrendingArticles(topArticles);

//         const recent = articles
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//           .slice(0, 6);
//         setRecentArticles(recent);

//         const mostCommented = articles
//           .sort((a, b) => b.comment_count - a.comment_count)
//           .slice(0, 6);
//         setMostCommentedArticles(mostCommented);
//       })
//       .catch((err) => {
//         console.error("Error fetching articles:", err);
//       })
//       .finally(() => {
//         setIsPageLoading(false);
//       });
//   }, []);

//   if (isPageLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
//         <p className="ml-4 text-lg font-semibold">Loading articles...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="whitespace-nowrap mt-3 text-left w-full">
//         <h2 className="w-full text-3xl font-extrabold text-florescent-yellow mt-6 mb-4 transform transition-all hover:scale-105 text-left">
//           Trending articles
//         </h2>
//       </div>
//       <div className="overflow-x-auto whitespace-nowrap p-2 w-full">
//         <ul className="flex space-x-4 min-w-max">
//           {trendingArticles.map((article) => (
//             <li key={article.article_id}>
//               <ArticleCard
//                 article_img_url={article.article_img_url}
//                 author={article.author}
//                 comment_count={article.comment_count}
//                 created_at={article.created_at}
//                 title={article.title}
//                 topic={article.topic}
//                 article_id={article.article_id}
//                 votes={article.votes}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="whitespace-nowrap mt-8 text-left w-full">
//         <h2 className="text-3xl font-extrabold text-florescent-yellow mt-6 mb-4 transform transition-all hover:scale-105 text-left">
//           Recent articles
//         </h2>
//       </div>
//       <div className="overflow-x-auto whitespace-nowrap p-2 w-full">
//         <ul className="flex space-x-4 min-w-max">
//           {recentArticles.map((article) => (
//             <li key={article.article_id}>
//               <ArticleCard
//                 article_img_url={article.article_img_url}
//                 author={article.author}
//                 comment_count={article.comment_count}
//                 created_at={article.created_at}
//                 title={article.title}
//                 topic={article.topic}
//                 article_id={article.article_id}
//                 votes={article.votes}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="mt-8 text-left w-full">
//         <h2 className="text-4xl font-extrabold text-florescent-yellow mt-6 mb-4 transform transition-all hover:scale-105 text-left">
//           Articles users love to discuss!
//         </h2>
//       </div>
//       <div className="overflow-x-auto whitespace-nowrap p-2 w-full">
//         <ul className="flex space-x-4 min-w-max">
//           {mostCommentedArticles.map((article) => (
//             <li key={article.article_id}>
//               <ArticleCard
//                 article_img_url={article.article_img_url}
//                 author={article.author}
//                 comment_count={article.comment_count}
//                 created_at={article.created_at}
//                 title={article.title}
//                 topic={article.topic}
//                 article_id={article.article_id}
//                 votes={article.votes}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Trending;
