import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import "reflect-metadata";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (
                errors: ValidationError[]
            ): BadRequestException => new BadRequestException(errors),
        })
    );
    await app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });
}
bootstrap();
