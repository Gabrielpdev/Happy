import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import { compare, hash } from 'bcryptjs';

import userView from '../views/UsersView';
import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const userRepository = getRepository(User);

    const passwordHash = await hash(password, 8);

    const data = {
      id: v4(),
      name,
      email,
      password: passwordHash,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const checkEmail = await userRepository.findOne({ where: { email } });

    if (checkEmail) {
      return response.status(403).json({ message: 'Email already exists' });
    }

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(userView.render(user));
  },

  async update(request: Request, response: Response) {
    const {
      name,
      email,
      old_password,
      password,
      password_confirmation,
    } = request.body;

    const { id } = request.user;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if (!user) {
      return response.status(400).json({ message: 'User does not exists' });
    }

    const checkEmail = await userRepository.findOne({ where: { email } });

    if (checkEmail?.email && checkEmail.id === id) {
      return response.status(400).json({ message: 'Email already exists' });
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      return response.status(400).json({
        message: 'You need to inform the old password to set the new password',
      });
    }

    if (password && old_password) {
      if (password !== password_confirmation) {
        return response.status(400).json({
          message: 'Password and password confirmation does not match',
        });
      }

      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        return response.status(400).json({
          message: 'Old password does not match',
        });
      }
      user.password = await hash(password, 8);
    }

    await userRepository.save(user);

    return response.status(201).json(userView.render(user));
  },
};
