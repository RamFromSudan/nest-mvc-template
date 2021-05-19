import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import exphbs from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import { join } from 'path';
import { AppModule } from './app.module';
import flash = require('connect-flash');
import { NestFactoryStatic } from '@nestjs/core/nest-factory';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'example',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    }),
  );

  const apiFactory = new NestFactoryStatic();

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  const viewsPath = join(__dirname, '../views');
  app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      partialsDir: join(__dirname, '..', 'views', 'partials'),
    }),
  );
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Example for Swagger')
    .setVersion('1.0')
    .addTag('Example Tag')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
