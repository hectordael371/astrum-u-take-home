import { University } from 'src/schemas'

export interface IUniversityRepository {
    findAll(): Promise<University[]>
    findOne(id: number): Promise<University>; 
    create(university: University): Promise<number>;
    update(university: University): Promise<number>;
}