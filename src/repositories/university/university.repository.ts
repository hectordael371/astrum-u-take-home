import { University, City, State } from 'src/schemas';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUniversityRepository } from './university.repository.interface';
import { readFileSync, writeFileSync } from 'fs';
import { EventMessages } from 'src/logging/event.messages';

@Injectable()
export class UniversityRepository implements IUniversityRepository {
    constructor(
        @Inject(Logger) private logger: Logger
    ) {
        /*
            In real world, this is where we would initialize the database driver or inject through DI.
        */
    }

    async findAll(): Promise<University[]> {
        try {
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

                this.logger.log(EventMessages.CompletedFetchingAllUniversitiesFromDatabase);
                resolve(universities);
            })
        }
        catch(error) {
            this.logger.error(EventMessages.ErrorFetchingAllUniversitiesFromDatabase)
            throw new Error(`Unexpected error occurred: ${error.message}`)
        }
    }

    async findOne(id: number): Promise<University> {
        try {
            /*
                In real world, this is where we would construct the db query and make the call to fetch the data.
            */
            const data = readFileSync('src/db/universities.json', 'utf8');
            let jsonData = JSON.parse(data);

            return new Promise<University>((resolve) => {
                const university: University = jsonData.universities.find(
                    (obj) => obj['id'] === id,
                );

                this.logger.log(EventMessages.CompletedFetchingUniversityByIdFromDatabase);
                resolve(university);
            })
        }
        catch(error) {
            this.logger.error(EventMessages.ErrorFetchingUniversityByIdFromDatabase);
            throw new Error(`Unexpected error occurred: ${error.message}`)
        }
    }

    async create(university: University): Promise<number> {
        try {
            /*
                In real world, this is where we would construct the db query and make the call to create the data.
            */
            // Fetch data from JSON and parse
            const data = readFileSync('src/db/universities.json', 'utf8');
            let jsonData = JSON.parse(data);

            // Add new data to parsed json
            jsonData.universities.push(university);

            // Serialize json data and write to file
            jsonData = JSON.stringify(jsonData, null, 2);
            writeFileSync('src/db/universities.json', jsonData);

            return new Promise<number>((resolve) => {
                this.logger.log(EventMessages.CompletedCreatingUniversityInDatabase);
                resolve(university.id);
            })
        }
        catch(error) {
            this.logger.error(EventMessages.ErrorCreatingUniversityInDatabase);
            throw new Error(`Unexpected error occurred: ${error.message}`)
        }
    }

    async update(university: University): Promise<number> {
        try {
            /*
                In real world, this is where we would construct the db query and make the call to update the data.
            */
            // Fetch data from JSON and parse
            const data = readFileSync('src/db/universities.json', 'utf8');
            let jsonData = JSON.parse(data);

            // Find specific university to update.
            let universityToUpdate = jsonData.universities.find(
                (obj) => obj['id'] === university.id,
            );

            // Update values
            universityToUpdate.name = university.name;
            universityToUpdate.city.id = university.city.id;
            universityToUpdate.city.name = university.city.name;
            universityToUpdate.city.state.id = university.city.state.id;
            universityToUpdate.city.state.name = university.city.state.name;

            // Serialize json data and write to file
            jsonData = JSON.stringify(jsonData, null, 2);
            writeFileSync('src/db/universities.json', jsonData);

            return new Promise<number>((resolve) => {
                this.logger.log(EventMessages.CompletedUpdatingUniversityInDatabase);
                resolve(university.id);
            })
        }
        catch(error) {
            this.logger.error(EventMessages.ErrorUpdatingUniversityInDatabase);
            throw new Error(`Unexpected error occurred: ${error.message}`)
        }
    }
}