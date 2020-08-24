import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/user/services/UpdateProfileService';
import ShowProfileService from '@modules/user/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
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
      old_password,
      password,
    } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      surname,
      cpf,
      phone,
      gender,
      address,
      neighborhood,
      city,
      uf,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
