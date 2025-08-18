import { Table as AntTable } from "antd";
import { useMemo } from "react";

const CustomTable = ({
  columns,
  data,
  rowKey = "id",
  className = "",
  headerClassName = "",
  rowClassName = "",
  size = "middle",
  bordered = false,
  loading = false,
  pagination = true,
  scroll = {},
  sortDirections = ["ascend", "descend"],
  showSorterTooltip = true,
  sticky = false,
  summary,
  onRow,
  onChange,
  ...props
}) => {
  // Merge default Tailwind classes with custom classes
  const tableClasses = useMemo(() => {
    const baseClasses = "rounded-lg overflow-hidden shadow-sm";
    return `${baseClasses} ${className}`;
  }, [className]);

  const headerClasses = useMemo(() => {
    const baseClasses = "bg-gray-50 font-semibold text-gray-600";
    return `${baseClasses} ${headerClassName}`;
  }, [headerClassName]);

  const rowClasses = useMemo(() => {
    const baseClasses = "hover:bg-gray-50 transition-colors";
    return `${baseClasses} ${rowClassName}`;
  }, [rowClassName]);

  // Custom pagination configuration
  const paginationConfig = useMemo(() => {
    if (pagination === false) return false;

    return {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ["10", "20", "50", "100"],
      showTotal: (total) => `Tổng ${total} bản ghi`,
      ...(typeof pagination === "object" ? pagination : {}),
    };
  }, [pagination]);

  return (
    <AntTable
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      className={tableClasses}
      size={size}
      bordered={bordered}
      loading={loading}
      pagination={paginationConfig}
      scroll={scroll}
      sortDirections={sortDirections}
      showSorterTooltip={showSorterTooltip}
      sticky={sticky}
      summary={summary}
      onChange={onChange}
      onRow={onRow}
      components={{
        header: {
          cell: ({ children, ...rest }) => (
            <th {...rest} className={headerClasses}>
              {children}
            </th>
          ),
        },
        body: {
          row: ({ children, ...rest }) => (
            <tr {...rest} className={rowClasses}>
              {children}
            </tr>
          ),
        },
      }}
      {...props}
    />
  );
};

export default CustomTable;
