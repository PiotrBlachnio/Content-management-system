import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthConfigModule } from "../config/auth/config.module";
import { UsersModule } from "../models/user/users.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [UsersModule, PassportModule, AuthConfigModule, JwtModule.register({
        secret: process.env.AUTH_SECRET,
        signOptions: { expiresIn: '24h' }
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}