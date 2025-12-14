import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TbArrowsUpDown } from "react-icons/tb";

const LeadsTable = ({ data: apiData }) => {
  const dummyData = React.useMemo(
    () => [
      {
        id: 1,
        fullName: "John Doe",
        email: "john@example.com",
        location: "New York",
        department: "Marketing",
        role: "Manager",
        empCode: "EMP001",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        email: "jane@example.com",
        location: "London",
        department: "Sales",
        role: "Executive",
        empCode: "EMP002",
      },
      {
        id: 3,
        fullName: "Robert Johnson",
        email: "robert@example.com",
        location: "Chicago",
        department: "IT",
        role: "Developer",
        empCode: "EMP003",
      },
    ],
    []
  );

  const columnHelper = createColumnHelper();
  const tableData = apiData && apiData.length > 0 ? apiData : dummyData;

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => {
        const value = info.getValue() || "-";
        return (
          <span
            className={` ${value === "-" ? "" : "text-[#0080ff]"} font-medium`}
          >
            {value}
          </span>
        );
      },
    }),

    columnHelper.accessor("phone", {
      header: "Contact",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue() || "-";

        const statusColors = {
          "follow-Up": "bg-orange-100 text-orange-800",
          qualified: "bg-green-100 text-green-800",
          converted: "bg-purple-100 text-purple-800",
          New: "bg-blue-100 text-blue-800",
        };

        const colorClass = statusColors[value] || "bg-gray-100 text-gray-800";

        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${colorClass}`}
          >
            {value}
          </span>
        );
      },
    }),
    columnHelper.accessor((row) => row.qualifications || row.qualification, {
      header: "Qualification",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("interestField", {
      header: "Interest",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("source", {
      header: "Source",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("assignedTo", {
      header: "Assigned To",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("jobInterest", {
      header: "Role",
      cell: (info) => info.getValue() || "-",
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container overflow-auto relative ">
      <table className="w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-[10px] text-left  text-[#64748b] text-[14px] font-normal whitespace-nowrap"
                >
                  <div className="inline-flex items-center gap-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <TbArrowsUpDown className="inline-block" size={16} />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-3 py-[10px] text-[#020817] font-semibold text-[14px] whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(LeadsTable);
