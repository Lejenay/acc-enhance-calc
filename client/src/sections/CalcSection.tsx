import { EnhanceInfo, MyCombobox, MyDropdown } from "../components"
import { OptionsDd } from "../components/MyDropdown"
import { OptionsCb } from "../components/MyCombobox"
import { useState } from "react"
import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"
import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { enhanceLevel } from "../constants"
import { items } from "../constants"


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
            <div className="min-w-[700px] bg-slate-50 mx-[50px] mb-[50px]
        shadow-md rounded-2xl" >
              <div className="font-NotoSans text-md text-slate-700 text-center mt-3">
                アクセサリーと強化段階を選択
              </div>
              <div className="flex mx-5 gap-3 justify-center items-center">

                {/* DO WE NEED ITEM ICONS ON FIRST VIEW ?*/}
                {/* <div className="w-14 p-1
                rounded-md bg-slate-50 shadow-md justify-center items-center
                 border-[3px] border-yellow-500">
                  <img
                    src={items.find(item => item.name === selectedCbOption.name)?.icon}
                  />
                </div> */}

                <div className="flex">
                  <MyCombobox options={items} />
                </div>
                <div className="flex">
                  <MyDropdown options={enhanceLevel} />
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
      </SelectedCbOptionContext.Provider>
    </SelectedDdOptionContext.Provider>
  )
}

export default CalcSection