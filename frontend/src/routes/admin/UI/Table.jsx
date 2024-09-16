import { createContext, useContext } from "react";
const TableContext = createContext();
function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div className="bg-white shadow-sm rounded border my-5 flex flex-col">
        {children}
      </div>
    </TableContext.Provider>
  );
}
function StyledHeader({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div className={`grid ${columns} border-b-2 py-3 px-5`}>{children}</div>
  );
}
function Body({ children }) {
  return <ul className="flex flex-col gap-2 py-3 px-5">{children}</ul>;
}
function Row({ border, children }) {
  const { columns } = useContext(TableContext);
  return (
    <li className={border ? "border-b border-black py-2" : ""}>
      <div className={`grid ${columns}`}>{children}</div>
    </li>
  );
}

Table.Header = StyledHeader;
Table.Body = Body;
Table.Row = Row;
export default Table;
