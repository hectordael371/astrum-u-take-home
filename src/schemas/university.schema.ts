import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { City } from './city.schema'

@ObjectType()
@InputType('UniversityInput')
export class University {
    @IsInt()
    @IsNotEmpty()
    @Field(() => Int, {
        description: 'Unique identifier value for the University.'
    })
    id: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => String, {
        description: 'Name of the University.'
    })
    name: string;

    @ValidateNested()
    @IsNotEmpty()
    @Field(type => City, {
        description: 'Object representing the City where the University resides in.'
    })
    city: City;
}