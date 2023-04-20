export interface IUniversityService {
    getUniversities(): []
    getUniversityById(id: number): []
    createUniversity(): number
    updateUniversity(): number
}