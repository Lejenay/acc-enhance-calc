import { createContext } from "react";

interface SelectedSwitchOptionContextType {
  selectedSwitchOption: boolean;
  setSelectedSwitchOption: (option: boolean) => void;
}

const defaultValue: SelectedSwitchOptionContextType = {
  selectedSwitchOption: true,
  setSelectedSwitchOption: () => {},
};

export const SelectedSwitchOptionContext =
  createContext<SelectedSwitchOptionContextType>(defaultValue);
