import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {baseURL} from '../src/utils/constant'
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

    const { name, email,address,password } = formData;
    e.preventDefault();
  
    axios.post(`${baseURL}/cadastro`, formData).then((res) => {
      console.log(res.data);
    });
  }
  
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
      <Button type="submit">Cadastrar</Button>
    </Form>
  );
}

export default Cadastro;
