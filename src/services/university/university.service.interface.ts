import { University } from 'src/schemas'

export interface IUniversityService {
    getUniversities(): Promise<University[]>
    getUniversityById(id: number): Promise<University>
    createUniversity(): Promise<number>
    updateUniversity(): Promise<number>
}