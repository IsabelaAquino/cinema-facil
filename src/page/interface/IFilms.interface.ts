import { ISeats } from "./ISeats.interface";

export interface IFilms {
    id: string,
    name: string,
    sinopse: string,
    url: string,
    sessions: ISeats[]
}