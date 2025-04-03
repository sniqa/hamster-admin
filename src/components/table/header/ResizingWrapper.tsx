import { Header, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";

const ResizingWrapper = <TData extends RowData>({
  header,
  children,
}: {
  header: Header<TData, unknown>;
  children: ReactNode;
}) => {
  return (
    <div
      className="flex justify-between items-center"
      onDoubleClick={() => header.column.resetSize()}
    >
      {children}
      <div
        onMouseDown={header.getResizeHandler()}
        onTouchStart={header.getResizeHandler()}
        className="h-6 w-1 rounded-full bg-gray-200 hover:bg-gray-400 cursor-col-resize"
      />
    </div>
  );
};

export default ResizingWrapper;
