import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST', process.env.DB_HOST),
        port: configService.get('DB_PORT', +process.env.DB_PORT),
        username: configService.get('DB_USERNAME', process.env.DB_USERNAME),
        password: configService.get('DB_PASSWORD', process.env.DB_PASSWORD),
        database: configService.get('DB_DATABASE', process.env.DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
