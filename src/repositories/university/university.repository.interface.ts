import { University } from 'src/schemas'

export interface IUniversityRepository {
    findAll(): Promise<University[]>
    findOne(id: number): Promise<University>; 
}