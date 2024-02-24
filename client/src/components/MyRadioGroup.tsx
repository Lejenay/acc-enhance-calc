import { useContext } from "react"
import { SelectedRgOptionContext } from "../contexts/SelectedRgOptionContext"

const option = [0, 1, 2, 3, 4]

const MyRadioGroup = () => {
  // const [selectedRgOption, setSelectedRgOption] = useState<number>(baseStack[0])
  const { selectedRgOption, setSelectedRgOption } = useContext(SelectedRgOptionContext)

  return (
    <div className="w-full px-4 py-3 flex items-center justify-center gap-3 select-none">
      {option.map(item => (
        <div key={item} onClick={() => setSelectedRgOption(item)}
          className={` shadow-md px-4 py-2 rounded-md cursor-pointer duration-200 ease-in-out
          ${selectedRgOption === item
              ? "bg-teal-600 text-white ring-2 ring-teal-600/40 ring-offset-2 focus:outline-none"
              : "bg-white"}`
          }>
          {item}
        </div>
      ))}
    </div>
  )
}


export default MyRadioGroup