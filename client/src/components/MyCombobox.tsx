import { Fragment, useContext, useState } from "react"

import { Combobox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"

import { SelectedCbOptionContext } from "../contexts/SelectedCbOptionContext"
import { items } from "../constants"

export interface OptionsCb {
  id: number
  name: string
}

interface MyComboboxProps {
  options: OptionsCb[],
  width?: string
}

const MyCombobox: React.FC<MyComboboxProps> = ({ options, width }) => {
  const { selectedCbOption, setSelectedCbOption } = useContext(SelectedCbOptionContext)

  const [query, setQuery] = useState<string>("")

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
        option.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div className="min-w-[300px]">
      {/* @ts-ignore I'm sorry...*/}
      <Combobox value={selectedCbOption.name} onChange={setSelectedCbOption}>
        <div className="relative m-3 font-NotoSans">
          <div className={`relative ${width ? width : "w-full"} cursor-default overflow-hidden rounded-md
           bg-white text-left px-3 py-2 shadow-md 
           focus:border-2 focus-visible:ring-2 focus-visible:teal-500`}>

            <Combobox.Button>
              <Combobox.Input onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)}
                className="bg-white w-full border-none py-2 pl-3 pr-10 text-sm 
              leading-5 text-gray-900 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"/>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-teal-700"
                  aria-hidden="true"
                />
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >

            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto 
            rounded-md bg-white px-1 py-1 text-base shadow-lg ring-1 ring-black/5 
            focus:outline-none sm:text-sm">
              {
                filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    何も見つかりませんでした
                  </div>
                ) : (
                  filteredOptions.map((option, index) => (
                    <Combobox.Option key={index} value={option} as={Fragment}>
                      {({ active }) => (
                        <li
                          className=
                          {`${active ? " bg-teal-600 text-white" : "bg-white text-gray-700"} 
                    flex gap-2 items-center mx-2 my-1 px-2 py-2 
                    rounded-md cursor-default select-none`}>
                          <img
                            src={items.find(item => item.name === option.name)?.icon}
                            alt={option.name}
                            className="w-6" />
                          {option.name}
                        </li>
                      )}
                    </Combobox.Option>
                  )))}
            </Combobox.Options>
          </Transition>
        </div>

      </Combobox>
    </div>
  )
}

export default MyCombobox