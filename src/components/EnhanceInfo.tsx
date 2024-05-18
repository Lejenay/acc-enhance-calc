import React from "react"
import { useState, useContext, useEffect } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCubesStacked,
  faSackDollar,
  faDice, faGavel,
  faCoins,
  faCircleNotch,
  faMoneyBillWave,
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons"
import ReactLoading from "react-loading";

import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { SelectedSwitchOptionContext } from "../contexts/SelectedSwitchOptionContext"
import { SelectedRgOptionContext } from "../contexts/SelectedRgOptionContext"
import { fetchMarketData, ItemData } from "../api/bdoMarketAPI"
import { items } from "../constants"
import { accSuccessChanceCalc, averageTrialsCalc } from "../utils"
import { stackCostCalc, expectedValueCalc } from "../utils"

const EnhanceInfo = () => {

  const { selectedDdOption } = useContext(SelectedDdOptionContext);
  const { selectedCbOption } = useContext(SelectedCbOptionContext);
  const { selectedSwitchOption } = useContext(SelectedSwitchOptionContext);
  const { selectedRgOption } = useContext(SelectedRgOptionContext)

  const [selectedMainKey, setSelectedMainKey] = useState<number>(items[0].id)
  const [inputFs, setInputFs] = useState<number>(100)
  const [fsCost, setFsCost] = useState<number>(0)
  const [warningFs, setWarningFs] = useState<string>("")
  const [itemData, setItemData] = useState<ItemData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const accSuccessRate = accSuccessChanceCalc(inputFs, selectedDdOption.id)

  /* calculate stack cost when inputFs, selectedRgOption, or selectedSwitchOption changes */
  useEffect(() => {
    const calculateStackCost = async () => {
      setIsLoading(true)
      const stackCost = await stackCostCalc(inputFs, selectedRgOption, selectedSwitchOption)
      setFsCost(Number(Math.floor(stackCost)))
      setIsLoading(false)
    }
    calculateStackCost()
  }, [inputFs, selectedRgOption, selectedSwitchOption])

  /* set selectedMainKey for Market API when selectedCbOption changes */
  useEffect(() => {
    const selected = items.find((item) => item.name === selectedCbOption.name)
    if (selected) {
      setSelectedMainKey(selected.id)
    }
  }, [selectedCbOption])

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

  /* set default inputFs when selectedDdOption changes */
  useEffect(() => {
    switch (selectedDdOption.id) {
      case 1:
        setInputFs(20)
        break;
      case 2:
        setInputFs(30)
        break;
      case 3:
        setInputFs(50)
        break;
      case 4:
        setInputFs(100)
        break;
      case 5:
        setInputFs(200)
        break;
    }
  }, [selectedDdOption])

  const handleInputFs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberPattern = /^\d*$/

    if (!numberPattern.test(value)) {
      setWarningFs("数字を入力してください")
      return;
    } else if (Number(value) > 300) {
      setWarningFs("300以下のスタックが設定できます")
      return;
    } else {
      setInputFs(Number(value))
      setWarningFs("")
    }
  }

  /* format number with comma */
  const formatNumber = (value: number): string => new Intl.NumberFormat('ja-JP').format(value);

  const getCronAmount = (itemName: string, enhanceLevel: number) => {
    const selectedItem = items.find((item) => item.name === itemName)
    const cronAmount = selectedItem?.cron[enhanceLevel - 1]
    return cronAmount
  }

  const expectedValue = Math.floor(
    expectedValueCalc(itemData, selectedDdOption.id, accSuccessRate, fsCost))

  const handleDecrement = () => {
    if (inputFs > 0) {
      setInputFs(inputFs - 1)
    }
  }

  const handleIncrement = () => {
    if (inputFs < 300) {
      setInputFs(inputFs + 1)
    }
  }

  return (
    <ul className="w-full max-w-md divide-y divide-gray-200 dark:divide-gray-700 font-NotoSans duration-500">
      {/* stack */}
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
              <div className="flex items-end justify-center">
                <button onClick={handleDecrement} className="px-2 py-1 mx-2 text-gray-600 shadow-md
                bg-white hover:bg-teal-600 
              hover:text-slate-200 rounded-full duration-150">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="text"
                  value={inputFs}
                  onChange={handleInputFs}
                  className="w-16 h-8 px-2 text-center bg-slate-50 
                hover:outline-none hover:ring-1 hover:ring-teal-600 
                hover:rounded-sm hover:duration-300 
                focus:outline-none focus:ring-1 focus:ring-teal-600
                focus:rounded-sm focus:duration-300
                cursor-text"
                />
                <button onClick={handleIncrement} className="px-2 py-1 mx-2 text-gray-600 shadow-md
                bg-white hover:bg-teal-600 
              hover:text-slate-200 rounded-full duration-150">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <div>
                {warningFs && <p className="text-sm text-red-500">{warningFs}</p>}
              </div>
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
          {isLoading ?
            <ReactLoading
              type="spin"
              color="teal"
              height="20px"
              width="20px"
              className="mx-auto duration-200"
            /> :
            <div className=
              {`inline-flex items-center text-base font-semibold  dark:text-white
              ${Number(expectedValue) > 0 ? "text-teal-600" : "text-red-600"}`}>
              {formatNumber(expectedValue) + " Silver"}
            </div>
          }
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
            {` ${parseFloat(accSuccessRate.toFixed(2))} %`}
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
            {averageTrialsCalc((accSuccessRate / 100))}
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
              推定スタック費用 <span className="text-red-600 font-bold">(beta)</span>
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Est. Cost of Fail Stacks
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            {isLoading ?
              <ReactLoading
                type="spin"
                color="teal"
                height="20px"
                width="20px"
                className="mx-auto duration-200"
              /> :
              <div className="flex flex-col items-end justify-center">
                {formatNumber(fsCost) + " Silver"}
              </div>
            }
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
            {getCronAmount(selectedCbOption.name, selectedDdOption.id)}
          </div>
        </div>
      </li>

    </ul >

  )
}

export default EnhanceInfo