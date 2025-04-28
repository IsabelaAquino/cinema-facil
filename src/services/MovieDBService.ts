import api from './apiTheMovie';

let uri = `3/discover/movie`;

export const MovieDBService = {
    async listFilms(): Promise<[]> {
        const response = await api.get(`${uri}?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc`);
        
        return response.data;
    },
};