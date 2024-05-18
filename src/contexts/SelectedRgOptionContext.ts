import { createContext } from "react";

interface SelectedRgOptionContextType {
  selectedRgOption: number;
  setSelectedRgOption: (option: number) => void;
}

const defaultValue: SelectedRgOptionContextType = {
  selectedRgOption: 0,
  setSelectedRgOption: () => {},
};

export const SelectedRgOptionContext =
  createContext<SelectedRgOptionContextType>(defaultValue);
