import { createContext } from 'react';
import { OptionsDd } from '../components/MyDropdown';

interface SelectedDdOptionContextType {
  selectedDdOption: OptionsDd;
  setSelectedDdOption: (option: OptionsDd) => void;
}

const defaultValue: SelectedDdOptionContextType = {
  selectedDdOption: { id: 0, name: '' },
  setSelectedDdOption: () => { },
};

export const SelectedDdOptionContext =
  createContext<SelectedDdOptionContextType>(defaultValue);