import { Combobox } from "@headlessui/react"
import { useState } from "react"

interface Item {
  id: number
  name: string
}

const items: Item[] = [
  { id: 1, name: 'Dragon' },
  { id: 2, name: 'Thunder' },
  { id: 3, name: 'Magic' },
  { id: 4, name: 'Loop' },
  { id: 5, name: 'Star' },
  { id: 6, name: 'River' },
  { id: 7, name: 'God' },
  { id: 8, name: 'Super' },
  { id: 9, name: 'Axis' },
  { id: 10, name: 'Nop' },
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

  console.log(filteredItems)


  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selectedItem} onChange={setSelectedItem} >
        <div className="relative mt-1">
          {/* プルダウンの候補のスタイルが↓div */}
          <div className="relative w-full cursor-default overflow-hidden rounded-lg
           bg-slate-100 text-left 
           shadow-md focus:outline-none focus-visible:ring-2
            focus-visible:ring-white/75 focus-visible:ring-offset-2
             focus-visible:ring-offset-teal-300 sm:text-sm">

            {/* インプット欄のスタイルが↓ Combobox.Input*/}
            <Combobox.Input onChange={(e) => setQuery(e.target.value)}
              className="bg-slate-100 w-full border-none py-2 pl-3 pr-10 text-sm 
              leading-5 text-gray-900 focus:ring-0" />

            <Combobox.Options>
              {filteredItems.map((item) => (
                <Combobox.Option key={item.id} value={item.name}>
                  {item.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>

          </div>
        </div>
      </Combobox>
    </div>
  )
}

export default MyCombobox