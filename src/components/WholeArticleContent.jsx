const WholeArticleContent = ({ title, article_img_url, author, body }) => {
  return (
    <>
      <section>
        <header className="bg-bgcolor text-left font-extrabold text-gray-800 text-xl md:text-4xl lg:text-6xl overflow-hidden text-ellipsis pb-4 text-black p-1 pt-4 pb-8">
          {title}
        </header>
      </section>

      <div className="flex flex-col items-start gap-4">
        <section className="gap-32">
          <div className="">
            <img
              src={article_img_url}
              alt="Article"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </section>

        <section className="flex-1 flex flex-col items-left justify-left px-2">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 text-left mb-4">
            {body}
          </p>

          <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-2 font-bold italic text-left">
            {author}
          </p>
        </section>
      </div>
    </>
  );
};

export default WholeArticleContent;
