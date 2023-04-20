import data from 'src/db/universities.json';
import { University, City, State } from 'src/schemas';
import { Injectable } from '@nestjs/common';
import { IUniversityRepository } from './university.repository.interface';
import { readFileSync } from 'fs';

// Maybe should be singleton to avoid desynchronization of data when multiple clients access api simultaneously
@Injectable()
export class UniversityRepository implements IUniversityRepository {
    constructor() {
        // inject logging service

        /*
            In real world, this is where we would initialize the database driver or inject through DI.
        */
    }

    async findAll(): Promise<University[]> {
        /*
            In real world, this is where we would construct the db query and make the call to fetch the data.
        */
        const data = readFileSync('src/db/universities.json', 'utf8');
        let jsonData = JSON.parse(data);

        return new Promise<University[]>((resolve) => {
            let universities: University[] = [];

            for(let i = 0; i < jsonData.universities.length; i++){
                let currentUniversity = jsonData.universities[i];

                let state = new State();
                state.id = currentUniversity.city.state.id;
                state.name = currentUniversity.city.state.name;

                let city = new City();
                city.id = currentUniversity.city.id;
                city.name = currentUniversity.city.name;
                city.state = state;

                let university = new University();
                university.id = currentUniversity.id;
                university.name = currentUniversity.name;
                university.city = city;

                universities.push(university);
            }

            resolve(universities);
        })
    }

    async findOne(id: number): Promise<University> {
        /*
            In real world, this is where we would construct the db query and make the call to fetch the data.
        */
        const data = readFileSync('src/db/universities.json', 'utf8');
        let jsonData = JSON.parse(data);

        return new Promise<University>((resolve) => {
            const university: University = jsonData.universities.find(
                (obj) => obj['id'] === id,
            );

            resolve(university);
        })
    }

}