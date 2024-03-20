import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faChartLine, faNoteSticky, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { mika } from "../assets/icons";


const Nav = () => {
  return (
    <header className="basis-1/5 px-10 py-10 border-r-[1px] border-slate-200 relative select-none">
      <Link to="/" >
        <div className="flex justify-start items-center gap-6">
          <img src={mika} alt="site icon" />
          <h1 className="font-Kiaro text-lg font-bold">
            アクセ錬金シミュレーター
          </h1>
        </div>
      </Link>
      <nav>
        <ul className="flex flex-col items-start gap-4">
          <li className="font-Kiaro text-xl text-slate-700 font-bold mt-[4rem]
                  hover:text-teal-600 hover:duration-300">
            <Link to="/" >
              <FontAwesomeIcon icon={faGem} />
              <span className="ml-4">期待値計算機</span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-700 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#calc-method" >
              <FontAwesomeIcon icon={faChartLine} />
              <span className="ml-4">
                計算方法
              </span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-700 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#updateLog" >
              <FontAwesomeIcon icon={faNoteSticky} />
              <span className="ml-4">アップデートログ</span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-700 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#privacy" >
              <FontAwesomeIcon icon={faShieldHalved} />
              <span className="ml-4">プライバシーポリシー</span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* social */}
      <div className="absolute bottom-[50px]">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center justify-around px-3 py-1 bg-slate-900 text-white rounded-full shadow-sm hover:bg-slate-700 duration-200">
            <FontAwesomeIcon icon={faXTwitter} />
            <a href="https://twitter.com/lejenay?ref_src=twsrc%5Etfw" data-show-count="false" target="_blank">@Lejenay</a>
          </div>
          <div className="flex gap-2 items-center justify-around px-3 py-1 bg-teal-600 text-white rounded-full shadow-sm hover:bg-teal-900 duration-200">
            <FontAwesomeIcon icon={faGithub} />
            <a href="https://github.com/Lejenay/acc-enhance-calc.git" target="_blank">GitHub</a>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Nav