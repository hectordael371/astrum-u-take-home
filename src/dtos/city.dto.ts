import { Field, Int, ObjectType } from '@nestjs/graphql';
import { State } from './state.dto'

@ObjectType()
export class City {
    @Field(() => Int, {
        description: 'Unique identifier value for the City.'
    })
    id: number;

    @Field(() => String, {
        description: 'Name of the City.'
    })
    name: string;

    @Field(() => State, {
        description: 'Object representing the State where the City resides in.'
    })
    state: State;
}