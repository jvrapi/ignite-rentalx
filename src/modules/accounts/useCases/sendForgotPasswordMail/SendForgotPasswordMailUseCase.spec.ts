import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/DateProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send Forgot Password Mail UseCase', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to usar', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '460771',
      email: 'lop@gu.dj',
      name: 'Aiden Parker',
      password: '1234'
    });

    await sendForgotPasswordMailUseCase.execute('lop@gu.dj');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('zefe@zucek.tg')
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: '903723',
      email: 'ufiva@igso.cy',
      name: 'Mike Cohen',
      password: '1234'
    });

    await sendForgotPasswordMailUseCase.execute('ufiva@igso.cy');

    expect(generateTokenMail).toBeCalled();
  });
});
