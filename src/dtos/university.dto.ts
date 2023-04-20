import { Field, Int, ObjectType } from '@nestjs/graphql';
import { City } from './city.dto'

@ObjectType()
export class University {
    @Field(() => Int, {
        description: 'Unique identifier value for the University.'
    })
    id: number;

    @Field(() => String, {
        description: 'Name of the University.'
    })
    name: string;

    @Field(() => City, {
        description: 'Object representing the City where the University resides in.'
    })
    city: City;
}