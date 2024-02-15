import { MyCombobox } from '../components'



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
            <MyCombobox />
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