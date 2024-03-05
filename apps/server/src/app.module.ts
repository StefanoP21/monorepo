import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from './user/middlewares/auth.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
    }),
    UserModule,
    MongooseModule.forRoot(
      'mongodb://stefanop21:Suj8sSF8PjEpmn33@ac-baikakn-shard-00-00.hqkuczq.mongodb.net:27017,ac-baikakn-shard-00-01.hqkuczq.mongodb.net:27017,ac-baikakn-shard-00-02.hqkuczq.mongodb.net:27017/?replicaSet=atlas-vkdzjr-shard-0&ssl=true&authSource=admin',
      {
        dbName: 'monorepo',
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
