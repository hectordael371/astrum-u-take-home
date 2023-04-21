export class EventMessages {
    // UniversityResolver Events
    public static GetAllUniversitiesRequestReceived = "GetAllUniversitiesRequestReceived";
    public static GetUniversityByIdRequestReceived = "GetUniversityByIdRequestReceived";
    public static CreateUniversityRequestReceived = "CreateUniversityRequestReceived";
    public static UpdateUniversityRequestReceived = "UpdateUniversityRequestReceived";

    // UniversityService Events
    public static ProcessingGetAllUniversitiesRequest = "ProcessingGetAllUniversitiesRequest";
    public static ProcessingGetUniversityByIdRequest = "ProcessingGetUniversityByIdRequest";
    public static ProcessingCreateUniversityRequest = "ProcessingCreateUniversityRequest";
    public static ProcessingUpdateUniversityRequest = "ProcessingUpdateUniversityRequest";

    public static ProcessedGetAllUniversitiesRequest = "ProcessedGetAllUniversitiesRequest";
    public static ProcessedGetUniversityByIdRequest = "ProcessedGetUniversityByIdRequest";
    public static ProcessedCreateUniversityRequest = "ProcessedCreateUniversityRequest";
    public static ProcessedUpdateUniversityRequest = "ProcessedUpdateUniversityRequest";

    public static ErrorProcessingGetAllUniversitiesRequest = "ErrorProcessingGetAllUniversitiesRequest";
    public static ErrorProcessingGetUniversityByIdRequest = "ErrorProcessingGetUniversityByIdRequest";
    public static ErrorProcessingCreateUniversityRequest = "ErrorProcessingCreateUniversityRequest";
    public static ErrorProcessingUpdateUniversityRequest = "ErrorProcessingUpdateUniversityRequest";

    public static ResourcesNotFoundForGetAllUniversitiesRequest = "ResourcesNotFoundForGetAllUniversitiesRequest";
    public static ResourceNotFoundForGetUniversityByIdRequest = "ResourceNotFoundForGetUniversityByIdRequest";
    public static ResourceNotFoundForUpdateUniversityRequest = "ResourceNotFoundForUpdateUniversityRequest";
    public static InvalidPayloadReceivedForCreateUniversityRequest = "InvalidPayloadReceivedForCreateUniversityRequest";
    public static InvalidPayloadReceivedForUpdateUniversityRequest = "InvalidPayloadReceivedForUpdateUniversityRequest";
    public static DuplicateIdReceivedForCreateUniversityRequest = "DuplicateIdReceivedForCreateUniversityRequest";

    // UniversityRepository Events
    public static CompletedFetchingAllUniversitiesFromDatabase = "CompletedFetchingAllUniversitiesFromDatabase";
    public static CompletedFetchingUniversityByIdFromDatabase = "CompletedFetchingUniversityByIdFromDatabase";
    public static CompletedCreatingUniversityInDatabase = "CompletedCreatingUniversityInDatabase";
    public static CompletedUpdatingUniversityInDatabase = "CompletedUpdatingUniversityInDatabase";

    public static ErrorFetchingAllUniversitiesFromDatabase = "ErrorFetchingAllUniversitiesFromDatabase";
    public static ErrorFetchingUniversityByIdFromDatabase = "ErrorFetchingUniversityByIdFromDatabase";
    public static ErrorCreatingUniversityInDatabase = "ErrorCreatingUniversityInDatabase";
    public static ErrorUpdatingUniversityInDatabase = "ErrorUpdatingUniversityInDatabase";
}