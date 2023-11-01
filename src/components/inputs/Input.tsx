import styled from 'styled-components'
import { Control, FieldErrors, FieldValues, useController } from 'react-hook-form'

const InputContainer = styled.div`
  width: 500px;

  @media (max-width: 500px) {
    width: 250px;
  }
  @media (max-width: 300px) {
    width: 200px;
  }
`

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid black;
  background-color: #F5F5F5;
  padding: 15px 20px;
  box-sizing: border-box;
  border-radius: 10px;

  &:focus {
    outline: none
  }
`
const StyledLabel = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`

const ErrorLabel = styled.span`
  color: ${props => props.theme.error};
  font-weight: bold;
  font-size: 14px;
`
const errorMessage = {
  'string.empty': 'Este campo é obrigatório.',
  'string.email': 'Por favor, digite um e-mail válido.',
  'string.min': 'A senha deve ter no minimo 6 caracteres.',
  'duplicated': 'Já existe uma conta criada com esse valor.'
}

interface Props{
  name?: string,
  control?: Control<FieldValues>,
  label?: string,
  defaultValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value?:string;
  error?:any;
  type: string;
}

type ContainerProps ={
  grid: string;
}

const Input = ({type, label, name, value, error, onChange } : Props) => {
  return (
    <InputContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        name={name}
        placeholder={label}
        type={type}
      />
      {error && <ErrorLabel>{error.message}</ErrorLabel>}
    </InputContainer>
  );
};
export default Input