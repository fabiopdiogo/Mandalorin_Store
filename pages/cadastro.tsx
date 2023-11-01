import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";

import Button from "../src/components/inputs/Button";
import Input from "../src/components/inputs/Input";
import { baseURL } from '../src/utils/constant';

import { signupSchema } from '../modules/validationSchema';
import { useForm } from "react-hook-form";

function Cadastro() {
  const router = useRouter();
  const { control, register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(signupSchema)
  });
  //console.log(errors)
  const createUser = async (values) => {
    console.log(values);
    
    axios.post(`${baseURL}/cadastro`, values).then((res) => {
      console.log(res.data);
    });

    router.push('/login');
  
  };

  return (
    <Div>
      <h1>MANDALORIAN STORE</h1>
      <Form onSubmit={handleSubmit(createUser)}>
        <InputContainer>
          <StyledLabel>Nome</StyledLabel>
          <StyledInput
            name="name"
            type="text"
            {...register("name")}
          />
          <ErrorLabel>{errors?.name?.message.toString()}</ErrorLabel>
        </InputContainer>
        <InputContainer>
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            name="email"
            type="email"
            {...register("email")} 
          />
          <ErrorLabel>{errors?.email?.message.toString()}</ErrorLabel>
        </InputContainer>
        <InputContainer>
        <StyledLabel>Endereço</StyledLabel>
        <StyledInput
          name="address"
          type="text"
          {...register("address")}
        />
        <ErrorLabel>{errors?.address?.message.toString()}</ErrorLabel>
        </InputContainer>
        <InputContainer>
        <StyledLabel>Senha</StyledLabel>
        <StyledInput
          name="password"
          type="password"
          {...register("password")}
       
        />
         <ErrorLabel>{errors?.password?.message.toString()}</ErrorLabel>
        </InputContainer>
        
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Div>
  );
}

export default Cadastro;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
  p {
    font-weight: bold;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px;
`;

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