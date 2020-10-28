import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../views/OrphanagesView';
import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images'],
      where: { is_pending: true },
    });

    return response.json(orphanageView.renderMany(orphanages));
  },
};
