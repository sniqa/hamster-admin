import { ReactNode } from "react";

const RequireMark = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <span className="text-red-400">*</span>
      {children}
    </>
  );
};

export default RequireMark;
