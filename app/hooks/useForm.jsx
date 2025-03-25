import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // Resetear el formulario a su estado inicial
  const reset = () => {
    setValues(initialState);
  };

  // Manejar cambios en los inputs, soportando checkboxes y radios
  const handleInputChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Permite actualizar manualmente un campo del formulario
  const setValue = (name, newValue) => {
    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return {
    values,
    handleInputChange,
    reset,
    setValue,
  };
};
