import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {baseURL} from '../utils/constant'
import Button from "../src/components/inputs/Button";
import Input from "../src/components/inputs/Input";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 50px;
`;

function Cadastro() { 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
  });

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {

    } catch (error) {
      console.error(error);
      // Lide com erros aqui, por exemplo, definindo mensagens de erro na sua interface do usuário
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={createUser}>
      <Input label="Nome" name="name"  onChange={handleChange} value={formData.name} />
      <Input label="Email" name="email" onChange={handleChange} value={formData.email} />
      <Input label="Endereço" name="address"  onChange={handleChange} value={formData.address} />
      <Input label="Senha" name="password"  onChange={handleChange} value={formData.password} />
      <button type="submit">Cadastrar</button>
    </Form>
  );
}

export default Cadastro;
