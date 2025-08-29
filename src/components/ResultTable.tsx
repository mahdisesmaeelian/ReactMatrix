import React from "react";

interface ResultTableProps {
  matrix: number[][];
  onReset: () => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({
  matrix,
  onReset,
}) => {
  return (
    <div className="result-table">
      <h2>ماتریس پس از مرتب‌سازی</h2>
      <button onClick={onReset}>شروع مجدد</button>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
