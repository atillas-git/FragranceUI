export type AuthRequestDto = {
    Email:string;
    Password:string;
}

export type AuthResponseDto = {
    Token:string;
    UserId:number;
    Role:string;
}

export type RegisterRequestDto = {
    Email:string;
    Password:string;
}