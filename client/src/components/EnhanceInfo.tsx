import React from "react"
import { useState, useContext, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCubesStacked,
  faSackDollar,
  faDice, faGavel,
  faCoins,
  faCircleNotch,
  faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons"

import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { fetchMarketData, ItemData } from "../api/bdoMarketAPI"
import { testYellowCronRequired, items } from "../constants"
import { successChanceCalc, averageTrialsCalc } from "../utils"


const EnhanceInfo = () => {

  const { selectedDdOption } = useContext(SelectedDdOptionContext);
  const { selectedCbOption } = useContext(SelectedCbOptionContext);

  const [selectedMainKey, setSelectedMainKey] = useState<number | undefined>(items[0].id)
  const [inputFs, setInputFs] = useState<number>(100)
  const [inputFsCost, setInputFsCost] = useState<number>(100000000)
  const [warningFs, setWarningFs] = useState<string>("")
  const [warningFsCost, setWarningFsCost] = useState<string>("")
  const [itemData, setItemData] = useState<ItemData | undefined>(undefined);

  useEffect(() => {
    const selected = items.find((item) => item.name === selectedCbOption.name)
    if (selected) {
      setSelectedMainKey(selected.id)
    }
  }, [selectedCbOption])

  const handleInputFs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberPattern = /^\d*$/

    if (!numberPattern.test(value)) {
      setWarningFs("数字を入力してください")
      return;
    } else {
      setInputFs(Number(value))
      setWarningFs("")
    }
  }

  /**
   * Separate every three digits with a comma
   * @param value
   * @returns
   */
  const formatNumber = (value: number): string => new Intl.NumberFormat('ja-JP').format(value);

  const handleInputFsCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numberPattern = /^\d*$/
    const maxFsCost = 500000000000

    if (!numberPattern.test(value)) {
      setWarningFsCost("数字を入力してください")
      return;
    } else if (Number(value) > maxFsCost) {
      setWarningFsCost("500,000,000,000以下の数字を入力してください")
      return;
    } else {
      setInputFsCost(Number(value))
      setWarningFsCost("")
    }
  }


  const getCronAmountById = (enhanceLevel: number) => {
    const cronAmount = testYellowCronRequired.find(cron => cron.id === enhanceLevel)
    return cronAmount?.amount
  }

  /* API call */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ItemData | undefined = await fetchMarketData(selectedMainKey);
        setItemData(data)
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }
    fetchData()
  }, [selectedMainKey])

  // debug
  // useEffect(() => {
  //   console.log(itemData);
  // }, [itemData]);
  /* ******** */

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 font-NotoSans">

      {/* fail stacks */}
      <li className="pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <FontAwesomeIcon icon={faCubesStacked} />
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
                value={inputFs}
                onChange={handleInputFs}
                className="w-16 h-8 px-2 text-right bg-slate-50 
                focus:outline-none focus:ring-1 focus:ring-teal-600 
                focus:rounded-sm focus:duration-300"
              />
              {warningFs && <p className="text-sm text-red-500">{warningFs}</p>}
            </div>
          </div>
        </div>
      </li>

      {/* expected value */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              現在価格
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Current Value
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {`${itemData?.[selectedDdOption.id]
              ? formatNumber(itemData[selectedDdOption.id].basePrice) + " Silver"
              : "No data found"}`}
          </div>
        </div>
      </li>

      {/* expected value */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <FontAwesomeIcon icon={faSackDollar} />
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
          <FontAwesomeIcon icon={faDice} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              成功確率
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Chance of Success
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {` ${parseFloat(successChanceCalc(inputFs, selectedDdOption.id).toFixed(2))}%`}
          </div>
        </div>
      </li>

      {/* average attempts */}
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <FontAwesomeIcon icon={faGavel} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              平均試行回数
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Average Attempts
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {averageTrialsCalc((successChanceCalc(inputFs, selectedDdOption.id) / 100))}
          </div>
        </div>
      </li>

      {/* estimated fs cost */}
      <li className="py-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>
          <FontAwesomeIcon icon={faCoins} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              スタック費用 ( カスタム可能 )
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Cost of Fail Stacks ( Customizable )
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div className="flex flex-col items-end justify-center">
              <input
                type="text"
                value={formatNumber(inputFsCost)}
                onChange={handleInputFsCost}
                className="w-[9rem] h-8 px-2 text-right bg-slate-50 
                focus:outline-none focus:ring-1 focus:ring-teal-600 
                focus:rounded-sm focus:duration-300"
              />
              {warningFsCost && <p className="text-sm text-red-500">{warningFsCost}</p>}
            </div>
          </div>
        </div>
      </li>


      {/* number of cron stones required */}
      <li className="pt-3 pb-0 sm:pt-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
          </div>

          <div className="rotate-45">
            <FontAwesomeIcon icon={faCircleNotch} />
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
            {getCronAmountById(selectedDdOption.id)}
          </div>
        </div>
      </li>
    </ul>

  )
}

export default EnhanceInfo