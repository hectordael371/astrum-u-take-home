import { BadRequestException, HttpException, NotFoundException } from "@nestjs/common/exceptions";
import { IUniversityService } from "./university.service.interface";
import { University } from 'src/schemas'
import { UniversityRepository } from "src/repositories/university/university.repository";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IUniversityRepository } from "src/repositories/university/university.repository.interface";

@Injectable()
export class UniversityService implements IUniversityService {
    constructor(
        @Inject(UniversityRepository)
        private universityRepository: IUniversityRepository
    ) { }

    async getUniversities(): Promise<University[]> {
        try {
            return this.universityRepository.findAll()
                .then((universities: University[]) => {
                    if (universities.length > 0){
                        return universities;
                    }
                    else if (universities.length == 0){
                        throw new NotFoundException("Resource 'Universities' was not found.")
                    }
                })
        }
        catch(error) {
            if (error instanceof NotFoundException) {
                throw error; // re-throw NotFoundException to ensure a 404 status code
            }
    
            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    async getUniversityById(id: number): Promise<University> {
        try {
            return this.universityRepository.findOne(id)
                .then((university: University) => {
                    if (university){
                        return university;
                    }
                    else {
                        throw new NotFoundException("Resource 'University' was not found.")
                    }
                })
        }
        catch(error) {
            if (error instanceof NotFoundException) {
                throw error; // re-throw NotFoundException to ensure a 404 status code
            }
    
            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUniversity(university: University): Promise<number> {
        try {
            let existingUniversity = await this.universityRepository.findOne(university.id);

            if (existingUniversity){
                throw new BadRequestException(`University with id ${university.id} already exists.`);
            }

            return await this.universityRepository.create(university);
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw error; // re-throw BadRequestException to ensure a 400 status code
            }
    
            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUniversity(university: University): Promise<number> {
        try {
            let existingUniversity = await this.universityRepository.findOne(university.id);

            if (!existingUniversity){
                throw new NotFoundException(`University with id ${university.id} was not found.`);
            }

            return await this.universityRepository.update(university);
        }
        catch(error) {
            if (error instanceof NotFoundException) {
                throw error; // re-throw NotFoundException to ensure a 404 status code
            }
    
            throw new HttpException(`Unexpected error occurred: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}