import { ArgsType, InputType, ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { GraphQLJSON } from "graphql-type-json";
import { InputJsonValue } from "../types";

@ArgsType()
@InputType("PromoteUserInputInput")
@ObjectType("PromoteUserInputObject")
class PromoteUserInput {
    @Field(() => [String])
    @ApiProperty({
        required: true,
        type: () => [String]
    })
    @Type(() => String)
    userId!: string[];

    @Field(() => Number)
    @ApiProperty({
        required: true,
        type: () => Number
    })
    @Type(() => Number)
    score!: number;

    @Field(() => Boolean)
    @ApiProperty({
        required: true,
        type: () => Boolean
    })
    @Type(() => Boolean)
    isAdmin!: boolean;

    @Field(() => Date)
    @Type(() => Date)
    lastLogin!: Date;

    @Field(() => Number, {
        nullable: true
    })
    @ApiProperty({
        required: false,
        type: () => Number
    })
    @Type(() => Number)
    weightedScore?: number;

    @Field(() => GraphQLJSON, {
        nullable: true
    })
    extendedProfile?: InputJsonValue;

    @Field(() => PromoteUserInput, {
        nullable: true
    })
    @ApiProperty({
        required: false,
        type: () => PromoteUserInput
    })
    @Type(() => PromoteUserInput)
    selfReference?: PromoteUserInput;

    @Field(() => [PromoteUserInput], {
        nullable: true
    })
    @ApiProperty({
        required: false,
        type: () => [PromoteUserInput]
    })
    @Type(() => PromoteUserInput)
    selfReferenceArray?: PromoteUserInput[];
}

export { PromoteUserInput as PromoteUserInput };