import * as graphql from "@nestjs/graphql";
import { UserResolverBase } from "./base/user.resolver.base";
import { User } from "./base/User";
import { UserService } from "./user.service";
import { StorageService } from "src/storage/storage.service";

@graphql.Resolver(() => User)
export class UserResolver extends UserResolverBase {
  constructor(
    protected readonly service: UserService,
    protected readonly storageService: StorageService
  ) {
    super(service, storageService);
  }
}
