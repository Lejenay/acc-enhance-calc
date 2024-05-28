import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { mika } from "../assets/icons";


const Nav = () => {
  return (
    <header className="w-[320px] px-10 py-10 border-r-[1px] border-slate-200 relative select-none">
      <Link to="/" >
        <div className="flex justify-start items-center gap-6">
          <img src={mika} alt="crescent ring icon" className="max-2xl:w-8" />
          <h1 className="font-Kiaro text-md font-bold max-2xl:leading-5">
            <span className="max-sm:hidden text-lg">アクセ錬金シミュレーター</span>
          </h1>

        </div>
      </Link>
      <nav>
        <ul className="flex flex-col items-start gap-4 text-lg 2xl:text-xl">
          <li className="font-Kiaro text-slate-700 font-bold mt-[4rem]
                  hover:text-teal-600 hover:duration-300
                  ">
            <Link to="/" >
              <FontAwesomeIcon icon={faGem} />
              <span className="ml-4">期待値計算機</span>
            </Link>
          </li>

          <li className="font-Kiaro text-slate-700 font-bold mt-6
                  hover:text-teal-600 hover:duration-300">
            <Link to="/how-to-use" >
              <FontAwesomeIcon icon={faCircleInfo} />
              <span className="ml-4">使い方</span>
            </Link>
          </li>

        </ul>
      </nav>
    </header>
  )
}

export default Nav