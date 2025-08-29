import React, { useState } from 'react';

interface MatrixFormProps {
  dimensions: { m: number; n: number };
  initialMatrix: number[][];
  onSubmit: (matrix: number[][]) => void;
  onGoBack: () => void;
}

export const MatrixForm: React.FC<MatrixFormProps> = ({
  dimensions,
  initialMatrix,
  onSubmit,
  onGoBack,
}) => {
  const [matrix, setMatrix] = useState<number[][]>(initialMatrix);
  const [errors, setErrors] = useState<boolean[][]>(
    Array(dimensions.m).fill(null).map(() => Array(dimensions.n).fill(false))
  );

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newMatrix = matrix.map((row) => [...row]);
    const newErrors = errors.map((row) => [...row]);
    const numValue = Number(value);

    if (value !== '' && isNaN(numValue)) {
      newErrors[rowIndex][colIndex] = true;
    } else {
      newErrors[rowIndex][colIndex] = false;
      newMatrix[rowIndex][colIndex] = numValue;
    }

    setMatrix(newMatrix);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasError = errors.some((row) => row.some((cell) => cell));
    const isEmpty = matrix.some((row) => row.some((cell) => isNaN(cell)));

    if (hasError || isEmpty) {
      alert('لطفاً مقادیر معتبر برای تمام خانه‌ها وارد کنید.');
      return;
    }
    onSubmit(matrix);
  };

  return (
    <div className="container d-flex justify-content-center py-5" dir="rtl">
      <div className="col-12">
        <div className="card shadow rounded-4">
          <div
            className="card-header text-center py-3"
            style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)', color: 'white' }}
          >
            <h4 className="fw-bold mb-0">ورود مقادیر ماتریس ({dimensions.m} × {dimensions.n})</h4>
          </div>

          <div className="card-body bg-light p-4">
            <button
              type="button"
              onClick={onGoBack}
              className="btn btn-outline-secondary fw-bold mb-3"
            >
              بازگشت
            </button>

            <form onSubmit={handleSubmit}>
            <div className="table-responsive">
  <table className="table table-bordered text-center align-middle" style={{ tableLayout: 'fixed' }}>
    <tbody>
      {matrix.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, colIndex) => (
            <td key={colIndex} className="p-1">
              <input
                type="text"
                value={isNaN(cell) ? '' : cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`form-control form-control-sm text-center ${
                  errors[rowIndex][colIndex] ? 'is-invalid' : ''
                }`}
                style={{ width: '60px', height: '40px', margin: '0 auto', fontSize: '0.9rem' }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


              <button
                type="submit"
                className="btn btn-success w-100 fw-bold mt-3 py-2"
                style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)', border: 'none' }}
              >
                مرتب‌سازی و نمایش نتیجه
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
