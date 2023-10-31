import React, {FormEvent,useState, ChangeEvent, useContext } from "react"
import styled from "styled-components"
import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/router'

import { AuthContext } from "../src/contexts/Auth/AuthContext"
import { baseURL } from "../src/utils/constant"
import Input from "../src/components/inputs/Input"
//import {  Link } from "react-router-dom"
//import { useNavigate } from "react-router-dom";

function Login (){
  const router = useRouter()
  const[email, setEmail] = useState<string>("");
  const[password, setPassword] = useState<string>("");
  
  const auth = useContext(AuthContext);
  //const navigate = useNavigate();

  const createSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
      
      if(email && password){
        console.log("aqui")  
        const response = await auth.signin(email,password);  
        if (response === true) {
          console.log(auth.user);
          router.push('/')
        } else {
          console.log("Senha ou usuário inválidos");
        }
    
      setEmail("");
      setPassword("");
      }      
    
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "email") {
      setEmail(e.target.value);
    }
    else {
      setPassword(e.target.value)
    }
  };

  return(
    <Div>
      <Img src="icons/user-50.png" alt="" />
      <h1>Olá, faça seu login!</h1>
      <Form onSubmit={createSession}>
        <Input label="Email" name="email" error={""} onChange={handleChange} value={email}/>
        <Input label="Senha" name="password"  error={""} onChange={handleChange} value={password}/>
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
  background-color: #fff;  
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
  background-color: #111111;
  color:#ffffff;  
  padding: 15px;
  cursor: pointer;
`

const DivButton = styled.div`
  display:flex;
  gap:5px;
`
