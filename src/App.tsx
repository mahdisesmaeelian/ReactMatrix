import React, { useState } from "react";
import { DimensionForm } from "./components/DimensionForm";
import { MatrixForm } from "./components/MatrixForm";
import { ResultTable } from "./components/ResultTable";
import "./App.css";

const App: React.FC = () => {
  const [step, setStep] = useState<"dimensions" | "matrix" | "result">(
    "dimensions"
  );
  const [dimensions, setDimensions] = useState<{ m: number; n: number }>({
    m: 0,
    n: 0,
  });
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [sortedMatrix, setSortedMatrix] = useState<number[][]>([]);

  const handleDimensionsSubmit = (m: number, n: number) => {
    setDimensions({ m, n });
    const emptyMatrix = Array(m)
      .fill(null)
      .map(() => Array(n).fill(NaN));
    setMatrix(emptyMatrix);
    setStep("matrix");
  };

  const handleMatrixSubmit = (submittedMatrix: number[][]) => {
    const newSortedMatrix = submittedMatrix.map((row, index) => {
      const sortedRow = [...row];
      if (index % 2 === 0) {
        sortedRow.sort((a, b) => a - b);
      } else {
        sortedRow.sort((a, b) => b - a);
      }
      return sortedRow;
    });

    setSortedMatrix(newSortedMatrix);
    setStep("result");
  };

  const resetToStart = () => {
    setStep("dimensions");
    setDimensions({ m: 0, n: 0 });
    setMatrix([]);
    setSortedMatrix([]);
  };

  return (
    <div className="app">
      <h1>ساخت و مرتب‌سازی ماتریس</h1>

      {step === "dimensions" && (
        <DimensionForm onSubmit={handleDimensionsSubmit} />
      )}

      {step === "matrix" && (
        <MatrixForm
          dimensions={dimensions}
          initialMatrix={matrix}
          onSubmit={handleMatrixSubmit}
          onGoBack={() => setStep("dimensions")}
        />
      )}

      {step === "result" && (
        <ResultTable matrix={sortedMatrix} onReset={resetToStart} />
      )}
    </div>
  );
};

export default App;
