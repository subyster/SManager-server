import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  name: string;
  surname: string;
  cpf: number;
  phone: number;
  gender: 'M' | 'F' | 'N';
  address: string;
  neighborhood: string;
  city: string;
  uf: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    surname,
    cpf,
    phone,
    gender,
    address,
    neighborhood,
    city,
    uf,
    email,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('Email address already in use');
    }

    const checkCpfExists = await usersRepository.findOne({
      where: { cpf },
    });

    if (checkCpfExists) {
      throw new AppError('CPF number already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      surname,
      cpf,
      phone,
      gender,
      address,
      neighborhood,
      city,
      uf,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
