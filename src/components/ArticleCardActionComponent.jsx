import { useState } from "react";

const ArticleCardActionComponent = ({
  body,
  getArticleComments,
  isLoadingComments,
  buttonDisplay,
  openCommentForm,
}) => {
  const [showCommentsClicked, setShowCommentsClicked] = useState(false);
  const [writeCommentClicked, setWriteCommentClicked] = useState(false);

  const linkText =
    "text-xs sm:text-sm md:text-md lg:text-lg font-semibold block rounded-lg text-center transition-transform transform hover:scale-105 text-black";

  const getButtonStyle = (disabled, isClicked) => {
    return disabled
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : isClicked
      ? "bg-fluorescent-yellow text-black"
      : "bg-buttonpink text-black hover:bg-fluorescent-yellow";
  };

  const handleWriteCommentClick = () => {
    setWriteCommentClicked(!writeCommentClicked);
    openCommentForm();
  };

  return (
    <section className="bg-cardcolor rounded-lg p-4 w-full">
      <nav aria-label="Article Actions">
        <ul className="flex space-x-4 justify-center mt-4">
          {body !== undefined && (
            <>
              <li>
                <button
                  onClick={() => {
                    getArticleComments();
                    setShowCommentsClicked(!showCommentsClicked);
                  }}
                  disabled={isLoadingComments}
                  className={`${linkText} ${getButtonStyle(
                    isLoadingComments,
                    showCommentsClicked
                  )}`}
                >
                  {buttonDisplay}
                </button>
              </li>
              <li>
                <button
                  onClick={handleWriteCommentClick}
                  className={`${linkText} ${getButtonStyle(
                    false,
                    writeCommentClicked
                  )}`}
                >
                  {writeCommentClicked ? "Cancel Comment" : "Write Comment"}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </section>
  );
};

export default ArticleCardActionComponent;
