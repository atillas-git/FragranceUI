import { FragranceDto } from "./Fragrance";
import { UserDto } from "./User";

export type CommentCreateUpdateDto = {
    Content:string;
    Pros:string;
    Cons:string;
    UserId:number;
    FragranceId: number;
}

export type CommentDto = {
    Id: number;
    Content: string;
    Pros: string;
    Cons: string;
    CreatedAt:Date;
    User:UserDto;
    Fragrance: FragranceDto;
}