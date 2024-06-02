import { useState } from 'react';

const useFormState = (initVal) => {
  const [values, setValues] = useState(initVal);

  const setFormState = (newValue) => {
    setValues({
      ...values,
      ...newValue
    });
  };

  const resetForm = () => {
    setFormState(initVal);
  };

  return [
    values,
    setFormState,
    resetForm,
  ]
};

export default useFormState;