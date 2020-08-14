import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

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

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

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
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkEmailExists) {
      throw new AppError('Email address already in use');
    }

    const checkCpfExists = await this.usersRepository.findByCpf(cpf);

    if (checkCpfExists) {
      throw new AppError('CPF number already in use');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
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

    return user;
  }
}

export default CreateUserService;
