import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from "@hapi/joi";

//TODO: Create more configs from .env
//TODO: Remove unnecessary .env variables
//TODO: Remove config.service.ts

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_PORT: Joi.number().default('4000'),
                APP_MODE: Joi.string().valid('development', 'production', 'test').default('development'),
                APP_PREFIX: Joi.string().default('/api/v1')
            })
        })
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService]
})

export class AppConfigModule {}