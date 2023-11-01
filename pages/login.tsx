import React, {FormEvent,useState, ChangeEvent, useContext } from "react"
import styled from "styled-components"
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { loginSchema } from '../modules/validationSchema';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from "../src/contexts/Auth/AuthContext"
import { baseURL } from "../src/utils/constant"
import Input from "../src/components/inputs/Input"

function Login (){
  const router = useRouter();
  
  const auth = useContext(AuthContext);
  const { control, register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(loginSchema)
  });
  interface Login{
    email: string,
    password: string
  }
  const createSession = async (e: Login) => {
        
      const {email, password} = e;

      if(email && password){
        
        const response = await auth.signin(email,password);  
        console.log(response)  
        if (response === true) {
          console.log(auth.user);
          router.push('/')
        } else {
          console.log("Senha ou usuário inválidos");
        };
      }      
    
  };

  return(
    <Div>
      <Img src="icons/user-50.png" alt="" />
      <h1>MANDALORIAN STORE</h1>
      <h3>Olá, faça seu login!</h3>
      <Form onSubmit={handleSubmit(createSession)}>

        <InputContainer>
          <StyledLabel>Email</StyledLabel><StyledInput name="email" type="text" {...register("email")}/>
          <ErrorLabel>{errors?.email?.message.toString()}</ErrorLabel>
        </InputContainer>

        <InputContainer>
          <StyledLabel>Senha</StyledLabel><StyledInput name="password" type="passsword" 
          {...register("password")}/>
          <ErrorLabel>{errors?.password?.message.toString()}</ErrorLabel>
        </InputContainer>

        <Button>Entrar</Button>
        <Link href="/cadastro">Não tem login? Cadastre-se!</Link>
      </Form>
    </Div>
  )
}
export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Div = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
  gap:20px;
  height: 100vh;
  p{
    font-weight: bold;
  }
`
const Img = styled.img`
  width: 50px;
`
const Button = styled.button`
  width: 100px;
  resize:none;  
  background-color: #7516b4; 
  color:#ffffff;  
  padding: 15px;
  cursor: pointer;
  border-radius: 4px;
  
`

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid black;
  background-color: #F5F5F5;
  padding: 15px 20px;
  box-sizing: border-box;
  border-radius: 10px;

  &:focus {
    outline: none;
  }
`;
const StyledLabel = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`
const InputContainer = styled.div`
  width: 500px;

  @media (max-width: 500px) {
    width: 250px;
  }
  @media (max-width: 300px) {
    width: 200px;
  }
`
const ErrorLabel = styled.span`
  color: ${props => props.theme.error};
  font-weight: bold;
  font-size: 14px;
`

