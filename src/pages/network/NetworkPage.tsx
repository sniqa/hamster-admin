import IpAddressesTable from "./IpAddressesTable";
import { NetworkProvider } from "./context";

import NetworkTree from "./NetworkTree";

const NetworkPage = () => {
  return (
    <NetworkProvider>
      <div className="flex gap-x-2 pr-2 h-full box-border pb-2">
        <NetworkTree />

        <IpAddressesTable />
      </div>
    </NetworkProvider>
  );
};

export default NetworkPage;
