import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserServiceBase } from "./base/user.service.base";
import { LocalStorageService } from "src/storage/providers/local/local.storage.service";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly localStorageService: LocalStorageService,
  ) {
    super(prisma, localStorageService);
  }
}
