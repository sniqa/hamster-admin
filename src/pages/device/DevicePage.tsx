import DeviceTable from "./DeviceTable";

import { DeviceProvider } from "./context";

const DevicePage = () => {
  return (
    <DeviceProvider>
      <div className="pr-2">
        <DeviceTable />
      </div>
    </DeviceProvider>
  );
};

export default DevicePage;
