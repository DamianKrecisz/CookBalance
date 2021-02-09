import { Roles } from "./roles";
export interface User {
    uid: string;
    email: string;
    roles: Roles;
    sex?: string;
    weight?: number;
    height?: number;
    dateOfBirthday?: Date;
    activity?: string;

 }