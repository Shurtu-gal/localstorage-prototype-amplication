/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  User as PrismaUser,
  Organization as PrismaOrganization,
  Profile as PrismaProfile,
} from "@prisma/client";

import { PromoteUserArgs } from "./PromoteUserArgs";
import { PromoteUserInput } from "./PromoteUserInput";
import { FileUpload, StorageFileCore } from "src/storage/core/types.core";
import { StorageService } from "src/storage/storage.service";
import { ProvidersEnum } from "src/storage/providers";
import { InputJsonValue } from "src/types";

export class UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly storageService: StorageService
  ) {}

  async count<T extends Prisma.UserCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCountArgs>
  ): Promise<number> {
    return this.prisma.user.count(args);
  }

  async users<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ): Promise<PrismaUser[]> {
    return this.prisma.user.findMany(args);
  }
  async user<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique(args);
  }
  async createUser<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.create<T>(args);
  }
  async updateUser<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.update<T>(args);
  }
  async deleteUser<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<PrismaUser> {
    return this.prisma.user.delete(args);
  }

  async findEmployees(
    parentId: string,
    args: Prisma.UserFindManyArgs
  ): Promise<PrismaUser[]> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .employees(args);
  }

  async findOrganizations(
    parentId: string,
    args: Prisma.OrganizationFindManyArgs
  ): Promise<PrismaOrganization[]> {
    return this.prisma.user
      .findUniqueOrThrow({
        where: { id: parentId },
      })
      .organizations(args);
  }

  async getManager(parentId: string): Promise<PrismaUser | null> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .manager();
  }

  async getProfile(parentId: string): Promise<PrismaProfile | null> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .profile();
  }

  async uploadProfilePicture<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
    file: FileUpload,
  ): Promise<PrismaUser> {
    file.filename = `profilePicture-${args.where.id}.${file.filename.split(".").pop()}`;

    const profilePicture = await this.storageService.uploadFile(file, ProvidersEnum.LOCAL, ["image"], 1000000);
    return this.prisma.user.update({
      where: args.where,
      data: {
        profilePicture: profilePicture as InputJsonValue,
      },
    });
  }

  async deleteProfilePicture<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ): Promise<PrismaUser> {
    const { profilePicture } = await this.prisma.user.findUniqueOrThrow({
      where: args.where,
    });

    await this.storageService.deleteFile(profilePicture as unknown as StorageFileCore, ProvidersEnum.LOCAL);

    return this.prisma.user.update({
      where: args.where,
      data: {
        profilePicture: Prisma.DbNull,
      },
    });
  }

  async promoteUser(args: PromoteUserArgs): Promise<PromoteUserInput[]> {
    throw new Error("Not implemented");
  }
  async sendPasswordResetEmail(args: PromoteUserInput): Promise<boolean> {
    throw new Error("Not implemented");
  }
  async resendInviteEmail(args: PromoteUserInput): Promise<PromoteUserInput> {
    throw new Error("Not implemented");
  }
  async softDeleteUser(args: PromoteUserInput): Promise<PromoteUserInput> {
    throw new Error("Not implemented");
  }
}
