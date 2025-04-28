import { useState, useEffect} from 'react';
import { AppBar, Container, Grid, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { FilmsService } from '../services/FilmsService';
import { IFilms } from './interface/IFilms.interface';
import BoxFilmList from './BoxFilmList';
import { MovieDBService } from '../services/MovieDBService';

interface ISelectionPageProps {
  setSelectedFilm: (film: IFilms) => void,
  showAlert: (message: string, severity: string) => void,
  titleCustom?: string, 
  isVisibleAppBar?: boolean, 
  adminRoute?: boolean,
}

export function SelectionPage({ setSelectedFilm, showAlert, titleCustom, isVisibleAppBar = true, adminRoute = false }: ISelectionPageProps) {
  const [films, setFilms] = useState<IFilms[]>([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchFilms();
  }, [])

  const fetchFilms = async () => {
    try {
      const data = await FilmsService.listFilms();
      // const dataMovieDB = await MovieDBService.listFilms();
      // console.log("Consumindo filmes da api MovieDB:", dataMovieDB)

      setFilms(data);
    } catch (error) {
      console.error(error);
      showAlert("Ocorreu um erro ao carregar os filmes", "error");
      setFilms([]);
    }
  };

  return (
    <>
     {
        isVisibleAppBar ?
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Cinema Fácil
            </Typography>
          </Toolbar>
        </AppBar> : <></>
     }

      <Container maxWidth={false} sx={{ maxWidth: !isMobile && adminRoute ? '95%' : '100%'}}>
        {
          titleCustom ?  <Typography fontWeight={800} fontSize={'40px'}>  {titleCustom} </Typography> :
          <Typography variant='h2' sx={{ margin: "4rem 0" }}>  Qual filme deseja assistir? </Typography>
        }
       
        <Grid container spacing={2} rowGap={2}>
          <Grid item xs={12}>
            <BoxFilmList adminRoute={adminRoute} films={films} setSelectedFilm={setSelectedFilm} /> 
          </Grid>
        </Grid>
      </Container>
    </>
  )
}