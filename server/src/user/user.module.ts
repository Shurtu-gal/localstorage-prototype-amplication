import { Module } from "@nestjs/common";
import { UserModuleBase } from "./base/user.module.base";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { StorageModule } from "src/storage/storage.module";

@Module({
  imports: [UserModuleBase, StorageModule],
  controllers: [UserController],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
