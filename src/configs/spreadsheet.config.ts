import { registerAs } from '@nestjs/config';

export default registerAs('google', () => ({
  google: {
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
  },
}));
// export const googleConfig = async (
//   configService: ConfigService,
// ): Promise<unknown> => {
//   return {
//     google: {
//       privateKey: configService
//         .get<string>('PRIVATE_KEY')
//         ?.replace(/\\n/g, '\n'),
//       clientEmail: configService.get<string>('CLIENT_EMAIL'),
//     },
//   };
// };
