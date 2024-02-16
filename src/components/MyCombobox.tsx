import { Combobox, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Options {
  id: number
  name: string
}

interface MyComboboxProps {
  options: Options[]
}

const MyCombobox: React.FC<MyComboboxProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].name)
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
    <div>

      <Combobox value={selectedOption} onChange={setSelectedOption}>
        <div className="relative m-3 font-NotoSans">
          <div className="relative w-full cursor-default overflow-hidden rounded-md
           bg-white text-left px-3 py-2 shadow-md 
           focus:border-2 focus-visible:ring-2 focus-visible:teal-500">

            <Combobox.Input onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)}
              className="bg-white w-full border-none py-2 pl-3 pr-10 text-sm 
              leading-5 text-gray-900 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"/>

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto 
            rounded-md bg-white px-1 py-1  text-base shadow-lg ring-1 ring-black/5 
            focus:outline-none sm:text-sm">
              {
                filteredOptions.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    何も見つかりませんでした
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option key={option.id} value={option.name} as={Fragment}>
                      {({ active }) => (
                        <li className={`${active ? " bg-teal-50" : "bg-white"} 
                    px-2 py-2`}
                        >
                          <span className={`${active
                            ? "text-black"
                            : "text-slate-800"}
                          `}>
                            {option.name}
                          </span>
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