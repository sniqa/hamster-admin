import { useState } from "react";

export const useSwitch = (initial: boolean) => {
  const [state, setState] = useState(initial);
  const toggle = () => setState((o) => !o);

  return [state, toggle] as const;
};
