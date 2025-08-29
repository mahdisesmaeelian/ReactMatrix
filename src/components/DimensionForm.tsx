import React from 'react';
import { useForm } from 'react-hook-form';

interface DimensionFormProps {
  onSubmit: (m: number, n: number) => void;
}

interface FormData {
  m: number;
  n: number;
}

export const DimensionForm: React.FC<DimensionFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const validateOddNumber = (value: number): boolean | string => {
    if (value % 2 === 0) return 'عدد باید فرد باشد';
    return true;
  };

  const mValue = watch('m');
  const nValue = watch('n');

  const onFormSubmit = (data: FormData) => {
    const { m, n } = data;
    onSubmit(m, n);
  };

  return (
    <div className="container d-flex justify-content-center min-vh-100" dir="rtl">
      <div className="col-md-6">
        <div className="card shadow border-0 rounded-4 overflow-hidden">
          <div className="card-header text-center py-4" 
               style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)', color: 'white' }}>
            <h4 className="fw-bold mb-0">ورود ابعاد ماتریس</h4>
          </div>
          <div className="card-body bg-white p-4">
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="mb-4">
                <label htmlFor="m" className="form-label fw-semibold">تعداد سطرها:</label>
                <input
                  type="number"
                  id="m"
                  placeholder="مثلاً ۳"
                  {...register('m', {
                    required: 'وارد کردن تعداد سطرها الزامی است',
                    valueAsNumber: true,
                    min: { value: 3, message: 'حداقل مقدار مجاز ۳ است' },
                    validate: validateOddNumber,
                  })}
                  className={`form-control form-control-lg rounded-3 ${errors.m ? 'is-invalid' : ''}`}
                />
                {errors.m && <div className="invalid-feedback">{errors.m.message}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="n" className="form-label fw-semibold">تعداد ستون‌ها:</label>
                <input
                  type="number"
                  id="n"
                  placeholder="مثلاً ۵"
                  {...register('n', {
                    required: 'وارد کردن تعداد ستون‌ها الزامی است',
                    valueAsNumber: true,
                    min: { value: 3, message: 'حداقل مقدار مجاز ۳ است' },
                    validate: validateOddNumber,
                  })}
                  className={`form-control form-control-lg rounded-3 ${errors.n ? 'is-invalid' : ''}`}
                />
                {errors.n && <div className="invalid-feedback">{errors.n.message}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-100 rounded-3 fw-bold py-2" 
                disabled={!isValid || !mValue || !nValue}
                style={{ background: 'linear-gradient(135deg, #007bff, #00c6ff)', border: 'none' }}
              >
                تایید و ادامه
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
