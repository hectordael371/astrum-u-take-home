import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { State } from './state.schema'

@ObjectType()
@InputType('CityInput')
export class City {
    @IsInt()
    @IsNotEmpty()
    @Field(() => Int, {
        description: 'Unique identifier value for the City.'
    })
    id: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => String, {
        description: 'Name of the City.'
    })
    name: string;

    @ValidateNested()
    @IsNotEmpty()
    @Field(type => State, {
        description: 'Object representing the State where the City resides in.'
    })
    state: State;
}