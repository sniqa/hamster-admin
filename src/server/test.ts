import {
  create_network,
  find_network_tree,
  delete_network_by_id,
} from "@/server/controllers/network";

import {
  create_device,
  find_device,
  update_device,
  find_device_history,
} from "@/server/controllers/devices";

try {
  // const data = {
  //   type: "network5",
  //   parentId: 1,
  //   ipStart: "192.168.111.113",
  // };

  // const result = await delete_network_by_id({ id: 1 });

  const data = {
    serialNumber: "23",
    location: "sf",
  };

  // const result = await create_device(data);

  // await update_device({
  //   id: 1,
  //   serialNumber: "234",
  // });

  // console.log("result", result);

  console.log(await find_device_history({ id: 1 }));
} catch (err) {
  console.log("error", (err as Error).message);
}
