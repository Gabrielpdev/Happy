import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

class MailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    async function parse({
      file,
      variables,
    }: IParseMailTemplateDTO): Promise<string> {
      const templateFileContent = await fs.promises.readFile(file, {
        encoding: 'utf-8',
      });

      const parseTamplate = handlebars.compile(templateFileContent);

      return parseTamplate(variables);
    }

    const info = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Happy',
        address: from?.email || 'equipe@happy.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await parse(templateData),
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}

export default new MailProvider();
