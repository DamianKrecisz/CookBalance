import { Roles } from "./roles";
export interface User {
    uid: string;
    email: string;
    sex?: string;
    weight?: number;
    height?: number;
    dateOfBirthday?: Date;
    activity?: string;
 }