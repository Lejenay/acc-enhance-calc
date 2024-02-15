import { Combobox, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Item {
  id: number
  name: string
}

const items: Item[] = [
  { id: 1, name: '三日月守護者のリング' },
  { id: 2, name: 'デヴォレカイヤリング' },
  { id: 3, name: 'ツングラドのネックレス' },
]

const MyCombobox = () => {
  const [selectedItem, setSelectedItem] = useState<string>(items[0].name)
  const [query, setQuery] = useState<string>("")

  const filteredItems =
    query === ''
      ? items
      : items.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div>
      <Combobox value={selectedItem} onChange={setSelectedItem} >
        <div className="relative m-3 font-NotoSans">
          <div className="relative w-full cursor-default overflow-hidden rounded-md
           bg-white text-left px-3 py-2 shadow-md 
           focus:border-2 focus-visible:ring-2 focus-visible:teal-500">

            <Combobox.Input onChange={(e) => setQuery(e.target.value)}
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
                filteredItems.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    何も見つかりませんでした
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <Combobox.Option key={item.id} value={item.name} as={Fragment}>
                      {({ active }) => (
                        <li className={`${active ? " bg-slate-50" : "bg-white"} 
                    px-2 py-2`}
                        >
                          <span className={`${active
                            ? "text-black"
                            : "text-slate-800"}
                          `}>
                            {item.name}
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