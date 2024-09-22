import { FragranceDto } from "./Fragrance";
import { UserDto } from "./User";

export type RatingCreateOrUpdateDto = {
    OverallRating: number;
    PriceRating: number;
    FemininityRating: number;
    MasculinityRating: number;
    UserId:number;
    FragranceId:number;
}

export type RatingDto = {
    Id:number;
    OverallRating: number;
    PriceRating: number;
    MasculinityRating: number;
    User:UserDto;
    Fragrance: FragranceDto;
}