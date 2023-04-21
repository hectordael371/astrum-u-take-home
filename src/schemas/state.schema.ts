import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
@InputType('StateInput')
export class State {
    @IsInt()
    @IsNotEmpty()
    @Field(() => Int, {
        description: 'Unique identifier value for the State.',
    })
    id: number;

    @IsString()
    @IsNotEmpty()
    @Field(() => String, { 
        description: 'Name of the State.'
    })
    name: string;
}