/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { User } from "./User";
import { UserCountArgs } from "./UserCountArgs";
import { UserFindUniqueArgs } from "./UserFindUniqueArgs";
import { CreateUserArgs } from "./CreateUserArgs";
import { UpdateUserArgs } from "./UpdateUserArgs";
import { UserFindManyArgs } from "./UserFindManyArgs";
import { OrganizationFindManyArgs } from "../../organization/base/OrganizationFindManyArgs";
import { Organization } from "../../organization/base/Organization";
import { Profile } from "../../profile/base/Profile";
import { UserService } from "../user.service";
import { GraphQLUpload } from 'graphql-upload';
import { StorageService } from "src/storage/storage.service";
import { ProvidersEnum } from "src/storage/providers";
import { FileUpload, StorageFileCore } from "src/storage/core/types.core";

@graphql.Resolver(() => User)
export class UserResolverBase {
  constructor(
    protected readonly service: UserService,
  ) {}

  @graphql.Mutation(() => User)
  async uploadProfilePicture(
    @graphql.Args({ name: "file", type: () => GraphQLUpload })
    file: FileUpload,
    @graphql.Args() args: UserFindUniqueArgs,
  ): Promise<User> {
    return await this.service.uploadProfilePicture(args, file);
  }

  @graphql.Mutation(() => User)
  async deleteProfilePicture(
    @graphql.Args() args: UserFindUniqueArgs,
  ): Promise<User> {
    return await this.service.deleteProfilePicture(args);
  }

  @graphql.Mutation(() => [String])
  async uploadProfilePictures(
    @graphql.Args({ name: "files", type: () => [GraphQLUpload] })
    files: FileUpload[],
  ): Promise<String[]> {
    const awaitFiles = await Promise.all(files.map(async (file) => file));

    return await Promise.all(
      awaitFiles.map(async (file) => { 
        // return await this.storageService.uploadFile(file, ProvidersEnum.LOCAL, ['image'], 1000000);
        return "file";
      })
    );
  }

  async _usersMeta(
    @graphql.Args() args: UserCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => User, { nullable: true })
  async user(@graphql.Args() args: UserFindUniqueArgs): Promise<User | null> {
    const result = await this.service.user(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => User)
  async createUser(@graphql.Args() args: CreateUserArgs): Promise<User> {
    return await this.service.createUser({
      ...args,
      data: {
        ...args.data,

        manager: args.data.manager
          ? {
              connect: args.data.manager,
            }
          : undefined,

        profile: args.data.profile
          ? {
              connect: args.data.profile,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => User)
  async updateUser(@graphql.Args() args: UpdateUserArgs): Promise<User | null> {
    try {
      return await this.service.updateUser({
        ...args,
        data: {
          ...args.data,

          manager: args.data.manager
            ? {
                connect: args.data.manager,
              }
            : undefined,

          profile: args.data.profile
            ? {
                connect: args.data.profile,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [User], { name: "employees" })
  async findEmployees(
    @graphql.Parent() parent: User,
    @graphql.Args() args: UserFindManyArgs
  ): Promise<User[]> {
    const results = await this.service.findEmployees(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @graphql.ResolveField(() => [Organization], { name: "organizations" })
  async findOrganizations(
    @graphql.Parent() parent: User,
    @graphql.Args() args: OrganizationFindManyArgs
  ): Promise<Organization[]> {
    const results = await this.service.findOrganizations(parent.id, args);

    if (!results) {
      return [];
    }

    return results;
  }

  @graphql.ResolveField(() => User, {
    nullable: true,
    name: "manager",
  })
  async getManager(@graphql.Parent() parent: User): Promise<User | null> {
    const result = await this.service.getManager(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @graphql.ResolveField(() => Profile, {
    nullable: true,
    name: "profile",
  })
  async getProfile(@graphql.Parent() parent: User): Promise<Profile | null> {
    const result = await this.service.getProfile(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}
