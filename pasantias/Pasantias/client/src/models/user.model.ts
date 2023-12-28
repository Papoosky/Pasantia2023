// exporta el modelo de usuario
export interface UserInfo{
    id: number;
    email: string;
    role: string;
    step? : string;
    name? : string;
}