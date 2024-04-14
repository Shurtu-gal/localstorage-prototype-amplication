import { ArgsType, Field } from "@nestjs/graphql";
import { PromoteUserInput } from "./PromoteUserInput";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";

@ArgsType()
class PromoteUserArgs {
    @Field(() => PromoteUserInput, {
        nullable: true
    })
    @ApiProperty({
        required: false,
        type: () => PromoteUserInput
    })
    @Type(() => PromoteUserInput)
    data?: PromoteUserInput;

    @Field(() => UserWhereUniqueInput)
    @ApiProperty({
        required: true,
        type: () => UserWhereUniqueInput
    })
    @Type(() => UserWhereUniqueInput)
    where!: UserWhereUniqueInput;

    @Field(() => UserWhereUniqueInput)
    @ApiProperty({
        required: true,
        type: () => UserWhereUniqueInput
    })
    @Type(() => UserWhereUniqueInput)
    query!: UserWhereUniqueInput;
}

export { PromoteUserArgs as PromoteUserArgs };