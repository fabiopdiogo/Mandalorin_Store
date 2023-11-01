import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  name: Yup.string()
    .required('O campo "nome" é obrigatório')
    .max(50, 'O campo "nome" pode ter no máximo 50 caracteres'),
  email: Yup.string()
    .email('O campo "email" deve ser um e-mail válido')
    .required('O campo "email" é obrigatório')
    .max(100, 'O campo "email" pode ter no máximo 100 caracteres'),
  address: Yup.string()
    .required('O campo "endereço" é obrigatório')
    .max(50, 'O campo "endereço" pode ter no máximo 50 caracteres'),
  password: Yup.string()
    .required('O campo "senha" é obrigatório')
    .max(50, 'O campo "senha" pode ter no máximo 50 caracteres')
    .min(6, 'O campo "senha" deve ter no mínimo 6 caracteres'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('O campo "email" é obrigatório'),
  password: Yup.string()
    .required('O campo "senha" é obrigatório')
    .max(50, 'O campo "senha" pode ter no máximo 50 caracteres')
    .min(6, 'O campo "senha" deve ter no mínimo 6 caracteres'),
});
