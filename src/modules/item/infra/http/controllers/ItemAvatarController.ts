import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateItemAvatarService from '@modules/item/services/UpdateItemAvatarService';

export default class ItemAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateItemAvatar = container.resolve(UpdateItemAvatarService);

    const { item_id } = request.params;

    const item = await updateItemAvatar.execute({
      item_id,
      avatar: request.file.filename,
    });

    return response.json(classToClass(item));
  }
}
