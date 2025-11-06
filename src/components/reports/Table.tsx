import React from "react";

export const Table = ({ headers, rows }: { headers: string[], rows: (string | number | (string | number)[])[][] }) => {
    const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set());

    if (!rows || rows.length === 0) {
        return <p className="text-gray-400 text-center py-8">Нет данных для этой таблицы.</p>;
    }

    const toggleRow = (rowIndex: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(rowIndex)) {
            newExpanded.delete(rowIndex);
        } else {
            newExpanded.add(rowIndex);
        }
        setExpandedRows(newExpanded);
    };

    const renderNestedRows = (nestedData: (string | number | (string | number)[])[][], parentIndex: number) => {
        return nestedData.map((nestedRow, nestedIndex) => (
            <tr key={`${parentIndex}-nested-${nestedIndex}`} className="bg-gray-25 border-t border-gray-100">
                {headers.map((_header, cellIndex) => {
                    const cellData = nestedRow[cellIndex];
                    return (
                        <td key={cellIndex} className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap min-w-[120px]">
                            {cellIndex === 0 && '↳ '}{String(cellData || '')}
                        </td>
                    );
                })}
            </tr>
        ));
    };

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="px-4 py-3 text-left text-xs text-gray-600 uppercase tracking-wide whitespace-nowrap min-w-[120px]">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                {rows.map((row, rowIndex) => {
                    if (Array.isArray(row) && row.every(cell =>
                        cell === "" || cell === "00:00:00" || cell === "0 c." || cell === "0 км/ч"
                    )) {
                        return null;
                    }

                    const hasNestedData = row.length > headers.length && Array.isArray(row[headers.length]);
                    const isExpanded = expandedRows.has(rowIndex);

                    return (
                        <React.Fragment key={rowIndex}>
                            <tr className="hover:bg-gray-25">
                                {headers.map((_header, cellIndex) => {
                                    const cellData = row[cellIndex];
                                    return (
                                        <td key={cellIndex} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap min-w-[120px]">
                                            <div className="flex items-center gap-2">
                                                {cellIndex === 0 && hasNestedData && (
                                                    <button
                                                        onClick={() => toggleRow(rowIndex)}
                                                        className="text-blue-500 hover:text-blue-600 text-sm w-5 h-5 flex items-center justify-center rounded border border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-25"
                                                    >
                                                        {isExpanded ? '−' : '+'}
                                                    </button>
                                                )}
                                                <span>{String(cellData || '')}</span>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                            {hasNestedData && isExpanded && renderNestedRows(
                                row[headers.length] as unknown as (string | number | (string | number)[])[][],
                                rowIndex
                            )}
                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};
