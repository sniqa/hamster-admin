import { flexRender, Header, RowData, Table } from "@tanstack/react-table";
import ResizingWrapper from "./ResizingWrapper";

type TableHeaderProps<TData extends RowData> = {
  header: Header<TData, unknown>;
};

const TableHeader = <TData extends RowData>({
  header,
}: TableHeaderProps<TData>) => {
  return (
    <>
      <div
        {...{
          className: header.column.getCanSort()
            ? "cursor-pointer select-none"
            : "",
          onClick: header.column.getToggleSortingHandler(),
        }}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {{
          asc: " 🔼",
          desc: " 🔽",
        }[header.column.getIsSorted() as string] ?? null}
      </div>
    </>
  );
};

type RenderTableHeaderProps<TData extends RowData> = {
  header: Header<TData, unknown>;
  table: Table<TData>;
};

export const RenderTableHeader = <TData extends RowData>({
  header,
  table,
}: RenderTableHeaderProps<TData>) => {
  console.log(header.column.columnDef.enableResizing);
  console.log(table.options.enableResizing);

  const enableResizing =
    header.column.columnDef.enableResizing === undefined
      ? table.options.enableResizing
      : header.column.columnDef.enableResizing;

  return enableResizing ? (
    <ResizingWrapper header={header}>
      <TableHeader header={header} />
    </ResizingWrapper>
  ) : (
    <TableHeader header={header} />
  );
};

export default RenderTableHeader;
