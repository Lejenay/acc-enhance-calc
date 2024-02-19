import { EnhanceInfo, MyCombobox, MyDropdown } from "../components"
import { OptionsDd } from "../components/MyDropdown"
import { OptionsCb } from "../components/MyCombobox"
import { useState } from "react"
import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"

const enhanceLevel = [
  { id: 1, name: '真Ⅰ' },
  { id: 2, name: '真Ⅱ' },
  { id: 3, name: '真Ⅲ' },
  { id: 4, name: '真Ⅳ' },
  { id: 5, name: '真Ⅴ' },
]

export const items = [
  { id: 12031, name: '三日月守護者のリング' },
  { id: 11653, name: 'デヴォレカイヤリング' },
  { id: 11629, name: 'ツングラドのネックレス' },
  { id: 11853, name: '黒い侵食のイヤリング' },
]

const CalcSection = () => {
  const [selectedDdOption, setSelectedDdOption] = useState<OptionsDd>(enhanceLevel[0])
  const [selectedCbOption, setSelectedCbOption] = useState<OptionsCb>(items[0])

  return (
    <SelectedDdOptionContext.Provider value={{ selectedDdOption, setSelectedDdOption }}>
      <SelectedCbOptionContext.Provider value={{ selectedCbOption, setSelectedCbOption }}>
        <section className="flex-grow">
          <div className="flex items-center w-full h-12 text-left mx-10 my-10">
            <h1 className="text-2xl font-OpenSans font-bold text-slate-700">
              Expected Value <span className="text-teal-600">Calculator</span>
            </h1>
          </div>
          <div className="flex justify-center h-screen mt-15">
            <div className="w-full max-w-xl bg-slate-50 mx-[50px] mb-[50px]
        shadow-md rounded-2xl" >
              <div className="font-NotoSans text-md text-slate-700 text-center mt-3">
                アクセサリーと強化段階を選択
              </div>
              <div className="flex mx-10 gap-3 justify-center items-center">
                <div className="flex-grow">
                  <MyCombobox options={items} />
                </div>
                <div className="flex-grow">
                  <MyDropdown options={enhanceLevel} />
                </div>
              </div>

              <div className="flex-col mx-5 my-5">
                <EnhanceInfo />
              </div>
            </div>
            <div className="border-l-[1px] px-[50px] w-full">

            </div>
          </div>
        </section>
      </SelectedCbOptionContext.Provider>
    </SelectedDdOptionContext.Provider>
  )
}

export default CalcSection