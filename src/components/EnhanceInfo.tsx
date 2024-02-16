import React from "react"
import { useState, useContext } from "react"

const EnhanceInfo = () => {

  const [inputFS, setInputFS] = useState<number>(100)
  const [warning, setWarning] = useState<string>("")

  const handleInputFS = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberPattern = /^\d*$/

    if (!numberPattern.test(value)) {
      setWarning("数字を入力してください")
      return;
    } else {
      setInputFS(Number(value))
      setWarning("")
    }
  }

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 font-NotoSans">

      {/* fail stacks */}
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              スタック ( カスタム可能 )
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Fail Stacks ( Customizable )
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div className="flex flex-col items-end justify-center">
              <input
                type="text"
                value={inputFS}
                onChange={handleInputFS}
                className="w-16 h-8 px-2 text-center bg-slate-50 
                focus:outline-none focus:ring-1 focus:ring-teal-600 
                focus:rounded-sm focus:duration-300"
              />
              {warning && <p className="text-sm text-red-500">{warning}</p>}
            </div>
          </div>
        </div>
      </li>

      {/* expected value */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              期待値 ( 収益 )
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Expected Value ( Profit )
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            2,450,000,000 Silver
          </div>
        </div>
      </li>

      {/* chance of success */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              成功確率
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Chance of Success
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            12.05%
          </div>
        </div>
      </li>

      {/* average attempts */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              平均試行回数
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Average Attempts
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            8.29
          </div>
        </div>
      </li>

      {/* estimated fs cost */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              推定スタック費用
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Est. Cost of Fail Stacks
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            2,000,000,000 Silver
          </div>
        </div>
      </li>

      {/* number of cron stones required */}
      <li className="pt-3 pb-0 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              クロン石 必要個数
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Number of Cron Stones Required
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            3670
          </div>
        </div>
      </li>
    </ul>

  )
}

export default EnhanceInfo