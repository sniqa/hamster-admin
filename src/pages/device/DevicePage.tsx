import DeviceTable from "./DeviceTable";
import DeviceDialog from "./DeviceDialog";
import { useState } from "react";

const DevicePage = () => {
  const [open, setOpen] = useState(true);
  const onOpenChange = () => setOpen((o) => !o);

  return (
    <div>
      <DeviceTable onCreate={onOpenChange} />
      <DeviceDialog open={open} onClose={onOpenChange} />
    </div>
  );
};

export default DevicePage;
