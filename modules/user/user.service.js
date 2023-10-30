import { v4 as uuidv4 } from 'uuid'; // Importe a função uuidv4 do pacote uuid
import User from '../user/user.model'

export const signupUser = async (body) => {
  try {
    const { 
      name ,     
      email,
      address,
      password} = await User.create(body);
      
    return { 
      name ,     
      email,
      address,
      password}; // Retorne apenas o usuário criado
  } catch (err) {
    throw err;
  }
};

export const loginCheck = async (body) => {
  console.log(usersInMemory)
  try {
    const user = usersInMemory.find((u) => u.email === body.email || u.username === body.username);

    console.log({ usersInMemory });
    console.log({ body });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordIsCorrect = body.password === user.password;

    if (!passwordIsCorrect) {
      throw new Error('Incorrect password');
    }

    return user;
  } catch (err) {
    throw err;
  }
};
