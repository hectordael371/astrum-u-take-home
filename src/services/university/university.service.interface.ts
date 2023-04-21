import { University } from 'src/schemas'

export interface IUniversityService {
    getUniversities(): Promise<University[]>
    getUniversityById(id: number): Promise<University>
    createUniversity(university: University): Promise<number>
    updateUniversity(university: University): Promise<number>
}