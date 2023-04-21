import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { City } from './city.schema'

@ObjectType()
@InputType('UniversityInput')
export class University {
    @Field(() => Int, {
        description: 'Unique identifier value for the University.'
    })
    id: number;

    @Field(() => String, {
        description: 'Name of the University.'
    })
    name: string;

    @Field(type => City, {
        description: 'Object representing the City where the University resides in.'
    })
    city: City;
}