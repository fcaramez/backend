import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthConfig } from "./auth.config";
//import { PassportModule } from "@nestjs/passport";
//import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [],
  providers: [AuthConfig, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
