import { useState } from "react"

import {
  EnhanceInfo, MyCombobox, MyDropdown, MyRadioGroup, MySwitch
} from "../components"
import { OptionsDd } from "../components/MyDropdown"
import { OptionsCb } from "../components/MyCombobox"
import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { SelectedSwitchOptionContext } from "../contexts/SelectedSwitchOptionContext"
import { SelectedRgOptionContext } from "../contexts/SelectedRgOptionContext"
import { enhanceLevel } from "../constants"
import { items } from "../constants"


const CalcSection = () => {
  const [selectedDdOption, setSelectedDdOption] = useState<OptionsDd>(enhanceLevel[0])
  const [selectedCbOption, setSelectedCbOption] = useState<OptionsCb>(items[0])
  const [selectedSwitchOption, setSelectedSwitchOption] = useState<boolean>(true)
  const [selectedRgOption, setSelectedRgOption] = useState<number>(0)

  return (
    <SelectedDdOptionContext.Provider value={{ selectedDdOption, setSelectedDdOption }}>
      <SelectedCbOptionContext.Provider value={{ selectedCbOption, setSelectedCbOption }}>
        <SelectedSwitchOptionContext.Provider value={{ selectedSwitchOption, setSelectedSwitchOption }}>
          <SelectedRgOptionContext.Provider value={{ selectedRgOption, setSelectedRgOption }}>
            <section className="w-[800px]">
              <div className="flex items-center h-12 text-left mx-10 my-10">
                <h1 className="text-2xl font-OpenSans font-bold text-slate-700 select-none">
                  Expected Value <span className="text-teal-600">Calculator</span>
                </h1>
              </div>
              <div className="flex justify-center h-screen mt-15">
                <div className="min-w-[700px] bg-slate-50 mx-[50px] mb-[50px]
        shadow-md rounded-2xl" >
                  <div className="font-NotoSans text-md text-slate-700 text-center mt-3">
                    <p>アクセサリーと強化段階を選択</p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Select accessory and level
                    </p>
                  </div>
                  <div className="flex mx-5 gap-3 justify-center items-center">
                    <div className="flex">
                      <MyCombobox options={items} />
                    </div>
                    <div className="flex">
                      <MyDropdown options={enhanceLevel} />
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-5">
                    <div>
                      <p className="text-center font-NotoSans text-md text-slate-700 mt-3">
                        永久装備強化確率
                      </p>
                      <p className="text-sm text-center text-gray-500 truncate dark:text-gray-400">
                        Permanent Enhancement Chance
                      </p>
                      <MyRadioGroup />
                    </div>
                    <div>
                      <p className="text-center font-NotoSans text-md text-slate-700 mt-3">
                        ヴォルクスの叫び
                      </p>
                      <p className="text-sm text-center text-gray-500 truncate dark:text-gray-400">
                        Valks Enhancement Chance
                      </p>
                      <MySwitch />
                    </div>
                  </div>

                  <div className="flex flex-col mx-5 my-10 items-center justify-center">
                    <EnhanceInfo />
                  </div>
                </div>
              </div>
            </section>
          </SelectedRgOptionContext.Provider>
        </SelectedSwitchOptionContext.Provider>
      </SelectedCbOptionContext.Provider>
    </SelectedDdOptionContext.Provider>
  )
}

export default CalcSection