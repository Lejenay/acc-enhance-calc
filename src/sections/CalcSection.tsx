import { MyCombobox } from '../components'

const enhanceLevel = [
  {id: 1, name: '真1'},
  {id: 2, name: '真2'},
  {id: 3, name: '真3'},
  {id: 4, name: '真4'},
  {id: 5, name: '真5'},
]

const items = [
  { id: 1, name: '三日月守護者のリング' },
  { id: 2, name: 'デヴォレカイヤリング' },
  { id: 3, name: 'ツングラドのネックレス' },
]

const CalcSection = () => {
  return (
    <section className="flex-grow">
      <div className="flex items-center w-full h-12 text-left mx-10 my-10">
        <h1 className="text-2xl font-OpenSans font-bold text-slate-700">
          Expected Value <span className="text-teal-600">Calculator</span>
        </h1>
      </div>
      <div className="flex justify-center h-screen mt-15">
        <div className="w-full h-1/2 max-w-lg bg-slate-50 mx-[50px]
        shadow-lg rounded-2xl" >
          <div className="mx-10">
            <MyCombobox options={items}/>
          </div>
        </div>
        <div className="border-l-[1px] w-full"></div>
      </div>
      <div>

      </div>
    </section>
  )
}

export default CalcSection