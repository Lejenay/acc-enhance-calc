import { useContext } from 'react'
import { Switch } from '@headlessui/react'
import { SelectedSwitchOptionContext } from '../contexts/SelectedSwitchOptionContext'

const MySwitch = () => {
  const { selectedSwitchOption, setSelectedSwitchOption } = useContext(SelectedSwitchOptionContext)

  return (
    <div className="flex items-center justify-center py-[13px]">
      <Switch
        checked={selectedSwitchOption}
        onChange={setSelectedSwitchOption}
        className={`${selectedSwitchOption ? 'bg-teal-600' : 'bg-slate-500'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer 
          rounded-full border-2 border-transparent transition-colors 
          duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
           focus-visible:ring-white/75
           scale-90`}
      >
        <span
          aria-hidden="true"
          className={`${selectedSwitchOption ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full
             bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}

export default MySwitch