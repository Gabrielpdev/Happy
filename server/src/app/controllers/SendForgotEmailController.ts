import { Request, Response } from 'express';
import path from 'path';
import { getRepository } from 'typeorm';
import { v4 } from 'uuid';
import MailProvider from '../jobs/ForgotEmail';

// import userView from '../views/UsersView';
import User from '../models/User';

export default {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(403).json({ message: 'User not found' });
    }

    user.password_token = v4();
    user.password_token_expiration = new Date();

    userRepository.save(user);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'forgot_password.hbs',
    );

    await MailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Proffy] Recuperação de senha ',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${user.password_token}`,
        },
      },
    });

    return response.status(201).json({ message: 'Forgot email send' });
  },
};
