import { CommentDto } from "./Comment";
import { CreatorDto } from "./Creator";
import { RatingDto } from "./Rating";

export type FragranceCreateUpdateDto = {
    Name: string;
    PictureUrl: string;
    Gender:string;
    CreatorIds:number[];
    NoteIds:number[];
}

export type FragranceDto = {
    Id: number;
    Name: string;
    PictureUrl: string;
    Gender: string;
    Creators : CreatorDto [];
    FragranceNotes: FragranceNoteDto[];
    Ratings:RatingDto[];
    Comments:CommentDto[];
}

export type FragranceNoteCreateUpdateDto = {
    Name: string;
}

export type FragranceNoteDto = {
    Id: number;
    Name: string;
}