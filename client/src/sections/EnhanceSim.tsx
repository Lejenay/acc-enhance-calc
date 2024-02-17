import { stackIcon } from "../assets/icons"
import { enhanceScreen } from "../assets/images"

export default function EnhanceSim() {
  return (
    <div className="bg-slate-800 rounded-xl shadow-md h-3/4">
      {/* enhancement view */}
      <div className="relative mx-5 p-4 select-none">
        <img src={enhanceScreen} alt="enhance screen" className="w-full" />
        <span className="absolute top-[52%] left-[43%] 
  text-white text-2xl font-bold font-OpenSans">
          12.25%
        </span>
      </div>

      <div className="flex-col">
        {/* stack count */}
        <div className="flex justify-between items-center mb-3 mx-40">
          <div className="flex gap-2 items-center">
            <img src={stackIcon} alt="stack icon" width={28} />
            <span className="text-white text-lg font-NotoSans">
              スタック
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white font-bold text-xl">+ 254</span>
          </div>
        </div>

        {/* soft cap of stack */}
        <div className="flex justify-between items-center mb-3 mx-40">
          <div className="flex gap-2 items-center">
            <img src={stackIcon} alt="stack icon" width={28} />
            <span className="text-white text-lg font-NotoSans">
              スタックソフトキャップ
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white font-bold text-xl">504</span>
          </div>
        </div>

        {/* avg. attempt */}
        <div className="flex justify-between items-center mb-3 mx-40">
          <div className="flex gap-2 items-center">
            <img src={stackIcon} alt="stack icon" width={28} />
            <span className="text-white text-lg font-NotoSans">
              平均試行回数
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white font-bold text-xl">5.25</span>
          </div>
        </div>
      </div>

    </div>
  )
}

