import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faChartLine, faNoteSticky, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  return (
    <header className="w-1/5 min-h-screen px-10 py-10 border-r-[1px] border-slate-200">
      <Link to="/" >
        <div className="flex justify-start items-center gap-6">
          <img src="../src/assets/icons/mika.webp" alt="site icon" />
          <h1 className="font-Kiaro text-2xl font-bold">
            アクセ期待値計算機
          </h1>
        </div>
      </Link>
      <nav>
        <ul className="flex flex-col items-start gap-4">
          <li className="font-Kiaro text-xl text-slate-900 font-bold mt-[4rem]
                  hover:text-teal-600 hover:duration-300">
            <Link to="/" >
              <FontAwesomeIcon icon={faGem} />
              <span className="ml-4">期待値計算機</span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-900 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#analyze" >
              <FontAwesomeIcon icon={faChartLine} />
              <span className="ml-4">分析</span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-900 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#updateLog" >
              <FontAwesomeIcon icon={faNoteSticky} />
              <span className="ml-4">アップデートログ</span>
            </Link>
          </li>

          <li className="font-Kiaro text-xl text-slate-900 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="#privacy" >
              <FontAwesomeIcon icon={faShieldHalved} />
              <span className="ml-4">プライバシーポリシー</span>
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  )
}

export default Nav