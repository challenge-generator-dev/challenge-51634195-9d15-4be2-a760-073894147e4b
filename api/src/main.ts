import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Validacion global: los DTOs se transforman y se rechazan propiedades no declaradas.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Sin prefijo global: las rutas quedan exactamente como las declara el contrato (/orders, /orders/:id).
  app.enableShutdownHooks();

  const rawPort = process.env.PORT ?? '3000';
  const port = Number.parseInt(rawPort, 10);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Puerto invalido en la variable PORT: ${rawPort}`);
  }

  await app.listen(port);

  logger.log(`Aplicacion escuchando en http://localhost:${port}`);
  logger.log(`Endpoints disponibles en http://localhost:${port}/orders`);
}

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  // Un fallo de arranque no debe dejar el proceso colgado con un estado ambiguo.
  console.error(`No se pudo arrancar la aplicacion: ${message}`);
  process.exit(1);
});