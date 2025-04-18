import { ReactNode } from "react";

const RequireMark = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <span className="text-red-400">*</span>
    </>
  );
};

export default RequireMark;
