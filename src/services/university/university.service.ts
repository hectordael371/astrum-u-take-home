import { BadRequestException, HttpException, NotFoundException } from "@nestjs/common/exceptions";
import { IUniversityService } from "./university.service.interface";
import { University } from 'src/schemas'
import { UniversityRepository } from "src/repositories/university/university.repository";
import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { IUniversityRepository } from "src/repositories/university/university.repository.interface";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { EventMessages } from "src/logging/event.messages";

@Injectable()
export class UniversityService implements IUniversityService {
    // Injecting dependencies using constructor injection
    constructor(
        @Inject(UniversityRepository) private universityRepository: IUniversityRepository, 
        @Inject(Logger) private logger: Logger
    ) { }

    /**
     * Returns a list of all Universities.
     * Throws a NotFoundException if no Universities exist in the system.
     */
    async getUniversities(): Promise<University[]> {
        try {
            // Logging the request
            this.logger.log(EventMessages.ProcessingGetAllUniversitiesRequest);

            // Finding all universities from repository
            return this.universityRepository.findAll()
                .then((universities: University[]) => {
                    // Checking if any universities were found
                    if (universities.length > 0){
                        this.logger.log(EventMessages.ProcessedGetAllUniversitiesRequest);
                        return universities;
                    }

                    else {
                        // Logging and throwing error if no universities were found
                        this.logger.error(EventMessages.ResourcesNotFoundForGetAllUniversitiesRequest);
                        throw new NotFoundException("Resource 'Universities' was not found.")
                    }
                })
        }
        catch(error) {
            // Logging and handling errors
            this.logger.error(EventMessages.ErrorProcessingGetAllUniversitiesRequest);

            if (error instanceof NotFoundException) {
                throw error; // re-throw NotFoundException to ensure a 404 status code
            }

            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * Returns the University with the specified id.
     * Throws a NotFoundException if no University exists with the given id.
     * @param id - the id of the University to retrieve.
     */
    async getUniversityById(id: number): Promise<University> {
        try {
            // Logging the request
            this.logger.log(EventMessages.ProcessingGetUniversityByIdRequest);

            // Finding the university with the given id
            return this.universityRepository.findOne(id)
                .then((university: University) => {
                    // Checking if a university was found
                    if (university){
                        this.logger.log(EventMessages.ProcessedGetUniversityByIdRequest);
                        return university;
                    }

                    // Logging and throwing error if no university was found
                    else {
                        this.logger.error(EventMessages.ResourceNotFoundForGetUniversityByIdRequest);
                        throw new NotFoundException(`Resource 'University' was not found with id ${id}.`)
                    }
                })
        }
        catch(error) {
            // Logging and handling errors
            this.logger.error(EventMessages.ErrorProcessingGetUniversityByIdRequest);

            // If the error is a NotFoundException, re-throw it to ensure a 404 status code.
            if (error instanceof NotFoundException) {
                throw error;
            }

            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asynchronously creates a new university.
     * @param university - The university object to be created.
     * @returns A promise that resolves to the ID of the newly created university.
     * @throws BadRequestException if the input data fails validation or if a university with the same ID already exists.
     * @throws HttpException if an unexpected error occurs while processing the request.
     */
    async createUniversity(university: University): Promise<number> {
        try {
            // Logging the request
            this.logger.log(EventMessages.ProcessingCreateUniversityRequest);

            // Validate the input data.
            let errors = await validate(plainToInstance(University, university));
            if (errors.length > 0){
                // If there are validation errors, log an error message and throw a BadRequestException.
                this.logger.error(EventMessages.InvalidPayloadReceivedForCreateUniversityRequest);
                throw new BadRequestException(errors);
            }

            // Check if a university with the same ID already exists.
            let existingUniversity = await this.universityRepository.findOne(university.id);
            if (existingUniversity){
                // If a university with the same ID exists, log an error message and throw a BadRequestException.
                this.logger.error(EventMessages.DuplicateIdReceivedForCreateUniversityRequest);
                throw new BadRequestException(`University with id ${university.id} already exists.`);
            }

            // Create the new university and log a message indicating that the request has been processed.
            return this.universityRepository.create(university)
                .then((id: number) => {
                    this.logger.log(EventMessages.ProcessedCreateUniversityRequest);
                    return id;
                });
        }
        catch(error) {
            // Logging and handling errors
            this.logger.error(EventMessages.ErrorProcessingCreateUniversityRequest);

            // If the error is a BadRequestException, re-throw it to ensure a 400 status code.
            if (error instanceof BadRequestException) {
                throw error;
            }

            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asynchronously updates a university record in the database.
     * @param university - The university object to be updated.
     * @returns A Promise that resolves to the number of updated records.
     * @throws BadRequestException if the university object fails validation or is invalid.
     * @throws NotFoundException if the university with the given id is not found in the database.
     * @throws HttpException with a 500 status code if an unexpected error occurs.
     */
    async updateUniversity(university: University): Promise<number> {
        try {
            // Logging the request
            this.logger.log(EventMessages.ProcessingUpdateUniversityRequest);

            // Validate the input data.
            let errors = await validate(plainToInstance(University, university));
            if (errors.length > 0){
                this.logger.error(EventMessages.InvalidPayloadReceivedForUpdateUniversityRequest);
                throw new BadRequestException(errors);
            }

            // Check if a university with the ID exists.
            let existingUniversity = await this.universityRepository.findOne(university.id);
            if (!existingUniversity){
                // Logging and throwing error if no university was found
                this.logger.error(EventMessages.ResourceNotFoundForUpdateUniversityRequest);
                throw new NotFoundException(`University with id ${university.id} was not found.`);
            }

            // Update the university and log a message indicating that the request has been processed.
            return this.universityRepository.update(university)
                .then((id: number) => {
                    this.logger.log(EventMessages.ProcessedUpdateUniversityRequest);
                    return id;
                });
        }
        catch(error) {
            // Logging and handling errors
            this.logger.error(EventMessages.ErrorProcessingUpdateUniversityRequest);

            // If the error is a BadRequestException or NotFoundException, re-throw it to ensure a 400 or 404 status code.
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error; // re-throw exception to ensure a 404 or 400 status code.
            }
            
            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}