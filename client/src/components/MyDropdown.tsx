import { useContext, Fragment } from "react"

import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"

import { SelectedDdOptionContext } from "../contexts/SelectedDdOptionContext"

export interface OptionsDd {
  id: number
  name: string
}

interface MyDropdownProps {
  options: OptionsDd[],
  width?: string
}

const MyDropdown: React.FC<MyDropdownProps> = ({ options, width }) => {

  const { selectedDdOption, setSelectedDdOption } = useContext(SelectedDdOptionContext);

  return (
    <Menu>

      <Menu.Button className={`flex justify-center rounded-md bg-white
        px-4 py-[14px] shadow-md ${width ? width : "w-30"}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75
        `}>
        {(selectedDdOption as OptionsDd).name}
        <ChevronDownIcon
          className="-mr-1 ml-2 h-5 w-5 text-teal-700 hover:text-slate-600"
          aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute mt-2 w-[82px] divide-y divide-gray-100 rounded-md bg-white
      shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-3 py-2">
            {options.map((option) => (
              <Menu.Item key={option.id}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedDdOption(option)}
                    className={`${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                    {option.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>

    </Menu>

  )
}

export default MyDropdown