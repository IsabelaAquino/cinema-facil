import { Box, CircularProgress, Link, Paper, Skeleton, Typography } from "@mui/material";
import { IFilms } from "./interface/IFilms.interface";

interface IBoxFilmListProps {
    films: IFilms[];
    setSelectedFilm: (film: IFilms) => void;
    adminRoute?: boolean 
}

export default function BoxFilmList({ films, setSelectedFilm, adminRoute = false }: IBoxFilmListProps) {
  return (
    <Box display="flex" sx={{ columnGap: "1.5em", padding: "1rem", overflowX: 'auto', whiteSpace: 'nowrap', '&::-webkit-scrollbar': { height: '12px', backgroundColor: "#252525" }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'primary.main', borderRadius: "6px" } }}>
        {films.length > 0 ?
            films.map(film =>
                adminRoute ?    
                <img key={film.id} onClick={() => setSelectedFilm(film)} data-testid="film-display" src={film.url} style={{ height: '350px', borderRadius: "24px", marginTop: "0.5rem" }} />
                :
                <Link key={film.id} href="#" underline='none' onClick={() => setSelectedFilm(film)} data-testid="film-display">
                    <Paper elevation={4} sx={{ padding: "0.5rem", borderRadius: "0.5rem", '&:hover': { border: "1px solid", borderColor: "primary.dark" } }}>
                        <Typography variant='subtitle1'>{film.name}</Typography>
                        <img src={film.url} style={{ height: '350px', borderRadius: "10px", marginTop: "0.5rem" }} />
                    </Paper>
                </Link>
            ) :
            <>
                {
                    [...Array(5)].map((_, index) => (
                        <div key={index}>
                        <Paper elevation={4} sx={{
                            padding: "0.5rem", borderRadius: "0.5rem", display: "flex", flexDirection: "column",
                            width: '250px', height: "400px", justifyContent: "space-between"
                        }}>
                            <Skeleton variant="text" sx={{ width: '100%', height: 20 }} />
                            <Skeleton variant="rectangular" sx={{ height: '90%', marginTop: "0.5rem", borderRadius: "10px" }} />
                        </Paper>
                        </div>
                    ))
                }
                <Box display="flex" flexDirection={'column'}  justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box> 
            </>
        }
    </Box> 
  )
}
