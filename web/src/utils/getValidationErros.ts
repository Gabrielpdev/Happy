import { ValidationError } from 'yup';

interface ValidationErrorProps {
  [key: string]: string;
}

export default function getValidationErros(err:ValidationError): ValidationErrorProps {
  const validationErros: ValidationErrorProps = {};

  err.inner.forEach((error) => {
    validationErros[error.path] = error.message;
  });

  return validationErros;
}
