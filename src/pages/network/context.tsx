import { UpdateDeviceInfo } from "@/types/device";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

type NetworkDialogType = "add" | "edit" | "delete" | "update" | "comfirm";

interface NetworkContextType {
  open: NetworkDialogType | null;
  setOpen: (str: NetworkDialogType | null) => void;
  currentRow: UpdateDeviceInfo | null;
  setCurrentRow: Dispatch<React.SetStateAction<UpdateDeviceInfo | null>>;
}

const NetworkContext = createContext<NetworkContextType | null>(null);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<NetworkDialogType | null>(null);
  const [currentRow, setCurrentRow] = useState<UpdateDeviceInfo | null>(null);

  return (
    <NetworkContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </NetworkContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNetworkContext = () => {
  const netowrksContext = useContext(NetworkContext);

  if (!netowrksContext) {
    throw new Error("useUsers has to be used within <NetowrksContext>");
  }

  return netowrksContext;
};
