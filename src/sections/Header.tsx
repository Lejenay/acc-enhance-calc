import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  return (
    <div className="w-[1120px] m-14 border-t-[1px] border-slate-200 px-3 py-14 flex justify-end">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center justify-around px-3 py-1 bg-slate-900 text-white rounded-full shadow-sm hover:bg-slate-700 duration-200 w-[120px]">
          <FontAwesomeIcon icon={faXTwitter} />
          <a
            href="https://twitter.com/lejenay?ref_src=twsrc%5Etfw"
            data-show-count="false"
            target="_blank"
          >
            @Lejenay
          </a>
        </div>
        <div className="flex gap-2 items-center justify-around px-3 py-1 bg-teal-600 text-white rounded-full shadow-sm hover:bg-teal-900 duration-200 w-[120px]">
          <FontAwesomeIcon icon={faGithub} />
          <a
            href="https://github.com/Lejenay/acc-enhance-calc.git"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
