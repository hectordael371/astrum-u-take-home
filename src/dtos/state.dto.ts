import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class State {
    @Field(() => Int, {
        description: 'Unique identifier value for the State.',
    })
    id: number;

    @Field(() => String, { 
        description: 'Name of the State.'
    })
    name: string;
}