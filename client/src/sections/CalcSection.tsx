import { EnhanceInfo, MyCombobox, MyDropdown, MyRadioGroup, MySwitch } from "../components"
import { OptionsDd } from "../components/MyDropdown"
import { OptionsCb } from "../components/MyCombobox"
import { useState } from "react"
import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { enhanceLevel } from "../constants"
import { items } from "../constants"
import { SelectedSwitchOptionContext } from "../contexts/SelectedSwitchOptionContext"


const CalcSection = () => {
  const [selectedDdOption, setSelectedDdOption] = useState<OptionsDd>(enhanceLevel[0])
  const [selectedCbOption, setSelectedCbOption] = useState<OptionsCb>(items[0])
  const [selectedSwitchOption, setSelectedSwitchOption] = useState<boolean>(true)

  return (
    <SelectedDdOptionContext.Provider value={{ selectedDdOption, setSelectedDdOption }}>
      <SelectedCbOptionContext.Provider value={{ selectedCbOption, setSelectedCbOption }}>
        <SelectedSwitchOptionContext.Provider value={{ selectedSwitchOption, setSelectedSwitchOption }}>
        <section className="flex-grow">
          <div className="flex items-center w-full h-12 text-left mx-10 my-10">
            <h1 className="text-2xl font-OpenSans font-bold text-slate-700">
              Expected Value <span className="text-teal-600">Calculator</span>
            </h1>
          </div>
          <div className="flex justify-center h-screen mt-15">
            <div className="min-w-[700px] bg-slate-50 mx-[50px] mb-[50px]
        shadow-md rounded-2xl" >
              <div className="font-NotoSans text-md text-slate-700 text-center mt-3">
                アクセサリーと強化段階を選択
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
                  <span className="block text-center font-NotoSans text-md text-slate-700 mt-3">
                    永久装備強化確率
                  </span>
                  <MyRadioGroup />
                </div>
                <div>
                  <span className="block text-center font-NotoSans text-md text-slate-700 mt-3">
                    ヴォルクスの叫び
                  </span>
                  <MySwitch />
                </div>
              </div>

              <div className="flex flex-col mx-5 my-5 items-center justify-center">
                <EnhanceInfo />
              </div>
            </div>
            <div className="border-l-[1px] px-[50px] w-full">

            </div>
          </div>
        </section>
        </SelectedSwitchOptionContext.Provider>
      </SelectedCbOptionContext.Provider>
    </SelectedDdOptionContext.Provider>
  )
}

export default CalcSection