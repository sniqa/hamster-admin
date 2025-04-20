import DeviceTable from "./DeviceTable";

import { DeviceProvider } from "./context";

const DevicePage = () => {
  return (
    <DeviceProvider>
      <div className="pr-2 pb-2 w-full h-full max-h-full box-border">
        <DeviceTable />
      </div>
    </DeviceProvider>
  );
};

export default DevicePage;
