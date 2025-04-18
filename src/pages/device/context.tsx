import { UpdateDeviceInfo } from "@/types/device";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

type DeviceDialogType =
  | "add"
  | "edit"
  | "delete"
  | "update"
  | "comfirm"
  | "history";
type SubDeviceDialogType = "network" | "deviceModel";

interface DeviceContextType {
  open: DeviceDialogType | null;
  setOpen: (str: DeviceDialogType | null) => void;
  subOpen: SubDeviceDialogType | null;
  setSubOpen: (str: SubDeviceDialogType | null) => void;
  currentRow: UpdateDeviceInfo | null;
  setCurrentRow: Dispatch<React.SetStateAction<UpdateDeviceInfo | null>>;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<DeviceDialogType | null>(null);
  const [subOpen, setSubOpen] = useState<SubDeviceDialogType | null>(null);
  const [currentRow, setCurrentRow] = useState<UpdateDeviceInfo | null>(null);

  return (
    <DeviceContext
      value={{ open, setOpen, subOpen, setSubOpen, currentRow, setCurrentRow }}
    >
      {children}
    </DeviceContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeviceContext = () => {
  const devicesContext = useContext(DeviceContext);

  if (!devicesContext) {
    throw new Error("useDeviceContext has to be used within <DevicesContext>");
  }

  return devicesContext;
};
