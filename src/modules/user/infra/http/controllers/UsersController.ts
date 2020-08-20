import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/CreateUserService';
import { classToClass } from 'class-transformer';
import ListUsersService from '@modules/user/services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute({ user_id });

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
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
    });

    return response.json(classToClass(user));
  }
}
