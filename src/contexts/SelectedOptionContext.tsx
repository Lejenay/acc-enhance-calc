import { createContext } from 'react';
import { Options } from '../components/MyDropdown';

interface SelectedOptionContextType {
  selectedOption: Options;
  setSelectedOption: (option: Options) => void;
}

const defaultValue: SelectedOptionContextType = {
  selectedOption: { id: 0, name: '' },
  setSelectedOption: () => {},
};

export const SelectedOptionContext = createContext<SelectedOptionContextType>(defaultValue);