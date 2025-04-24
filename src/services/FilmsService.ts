import { IBookings } from '../page/interface/IBookings.interface';
import { IFilms } from '../page/interface/IFilms.interface';
import api from './api';

export const FilmsService = {
    async listFilms(): Promise<IFilms[]> {
        const response = await api.get(`/films`);
        return response.data;
    },
    async listBookings(idFilm: string, session: string): Promise<IBookings[]> {
        const response = await api.get(`/bookings?filmId=${idFilm}&session=${session}`);
        return response.data;
    },
    async toBooking(payload: any): Promise<any> {
        const response = await api.post(`/bookings`, payload);
        return response.data;
    },
};