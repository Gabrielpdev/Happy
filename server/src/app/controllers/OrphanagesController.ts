import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';
import deleteFile from '../../utils/deleteFile';

import orphanageView from '../views/OrphanagesView';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

export default {
  async index(request: Request, response: Response) {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      where: { is_pending: false },
      relations: ['images'],
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.findOneOrFail(id, {
      relations: ['images'],
    });

    return response.json(orphanageView.render(orphanages));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      opening_hours,
      instructions,
      open_on_weekends,
    } = request.body;

    const orphanageRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { id: v4(), path: image.filename };
    });

    const data = {
      id: v4(),
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      opening_hours,
      instructions,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      whatsapp: Yup.string().min(11).max(11).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create(data);

    await orphanageRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      opening_hours,
      instructions,
      open_on_weekends,
      is_pending,
    } = request.body;

    const imagesRepository = getRepository(Image);

    const imagesFound = await imagesRepository.find({
      where: { orphanage: id },
    });

    imagesFound.map(async image => {
      await deleteFile(image.path);
      await imagesRepository.remove(image);
    });

    const requestImages = request.files as Express.Multer.File[];
    const formattedImages = (requestImages.map(image => {
      return { id: v4(), path: image.filename, orphanage: id };
    }) as unknown) as Image[];

    const data = {
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      opening_hours,
      instructions,
      open_on_weekends: open_on_weekends === 'true',
      is_pending,
      images: formattedImages,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      whatsapp: Yup.string().min(11).max(11).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      is_pending: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    formattedImages.forEach(async image => {
      await imagesRepository.create(image);
      await imagesRepository.save(image);
    });

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne(id);

    if (orphanage) {
      orphanage.name = name;
      orphanage.latitude = latitude;
      orphanage.longitude = longitude;
      orphanage.about = about;
      orphanage.whatsapp = whatsapp;
      orphanage.opening_hours = opening_hours;
      orphanage.instructions = instructions;
      orphanage.open_on_weekends = open_on_weekends;
      orphanage.is_pending = is_pending;

      await orphanageRepository.save(orphanage);

      return response.status(201).json();
    }
    return response.status(403).json({ message: 'Orphanage does not exists' });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = await orphanageRepository.findOne(id);

    if (!orphanage) {
      return response
        .status(403)
        .json({ message: 'Orphanage does not exists' });
    }

    await orphanageRepository.remove(orphanage);

    return response
      .status(201)
      .json({ message: 'Orfanato deletado com sucesso' });
  },
};
