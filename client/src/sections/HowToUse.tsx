const HowToUse = () => {
  return (
    <section className="flex flex-col gap-[70px] select-none w-[800px]">
      <div className="flex flex-col m-10">
        <p className="text-lg font-Kiaro text-slate-700">使い方</p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          How to use
        </p>
      </div>
      <div className="flex">
        <div className="bg-slate-50 max-w-sm shadow-md rounded-lg px-10 py-5 relative font-Noto mx-10">
          <div
            className="bg-teal-600 rounded-full w-14 h-14 shadow-md absolute left-5 top-[-20px] 
        flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">1</span>
          </div>
          <div className="mt-10 font-bold text-lg font-Kiaro">
            <p>アクセサリーと強化段階を選択</p>
          </div>
          <div className="mt-4 leading-7 break-words text-slate-800 text-md max-w-[300px]">
            <p>
              ドロップダウンから、強化したいアクセサリーとその成功時の強化段階を選びます
            </p>
            <p>テキスト入力でのアクセサリーの検索にも対応しています</p>
          </div>
        </div>

        <div className="bg-slate-50 max-w-sm shadow-md rounded-lg px-10 py-5 relative  font-Noto mx-10">
          <div
            className="bg-slate-700 rounded-full w-14 h-14 shadow-md absolute left-5 top-[-20px] 
        flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">2</span>
          </div>
          <div className="mt-10 font-bold text-lg font-Kiaro">
            <p>永久確率/ヴォルクス/スタックを設定</p>
          </div>
          <div className="mt-4 leading-7 break-words text-slate-800 text-md max-w-[300px]">
            <p>
              <a
                href="https://ossan-gamer.net/glossary/glossary-42341/"
                className="text-blue-500 underline visited:text-purple-600"
                target="_blank"
              >
                永久装備強化確率
              </a>
              を0から4の範囲で設定できます
            </p>
            <p>ヴォルクスの叫びは120スタック以上で、自動的に適応されます</p>
            <p>スタックはテキスト入力、もしくは増減ボタンから設定します</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
