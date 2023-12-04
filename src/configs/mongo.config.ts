import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    dbName: configService.get<string>('MONGO_DB_NAME'),
    directConnection: true,
    connectTimeoutMS: configService.get<number>('MONGO_TIMEOUT'),
    serverSelectionTimeoutMS: configService.get<number>('MONGO_TIMEOUT'),
  };
};

const getMongoString = (config: ConfigService) => {
  return (
    'mongodb://' +
    config.get<string>('MONGO_HOST') +
    ':' +
    config.get<string>('MONGO_PORT')
  );
};
