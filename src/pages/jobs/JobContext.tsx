import { UpdateDeviceInfo } from "@/types/device";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

type JobDialogType = "add" | "edit" | "delete" | "update" | "comfirm";

interface JobContextType {
  open: JobDialogType | null;
  setOpen: (str: JobDialogType | null) => void;
  currentRow: UpdateDeviceInfo | null;
  setCurrentRow: Dispatch<React.SetStateAction<UpdateDeviceInfo | null>>;
}

const JobsContext = createContext<JobContextType | null>(null);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<JobDialogType | null>(null);
  const [currentRow, setCurrentRow] = useState<UpdateDeviceInfo | null>(null);

  return (
    <JobsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </JobsContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useJobsContext = () => {
  const jobsContext = useContext(JobsContext);

  if (!jobsContext) {
    throw new Error("useUsers has to be used within <JobsContext>");
  }

  return jobsContext;
};
