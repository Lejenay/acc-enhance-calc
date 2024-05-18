import { createContext } from 'react';
import { OptionsCb } from '../components/MyCombobox';

interface SelectedCbOptionContextType {
  selectedCbOption: OptionsCb;
  setSelectedCbOption: (option: OptionsCb) => void;
}

const defaultValue: SelectedCbOptionContextType = {
  selectedCbOption: { id: 0, name: '' },
  setSelectedCbOption: () => { },
};

export const SelectedCbOptionContext =
  createContext<SelectedCbOptionContextType>(defaultValue);