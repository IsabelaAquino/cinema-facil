import ChairIcon from '@mui/icons-material/Chair';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Button, Chip, Container, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { IFilms } from './interface/IFilms.interface';
import { FilmsService } from '../services/FilmsService';
import { IBookings } from './interface/IBookings.interface';
import { ISeats } from './interface/ISeats.interface';
import SeatsComponent from './SeatsComponent';

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

interface ICheckoutPageProps {
  selectedFilm: IFilms,
  showAlert: (message: string, severity: string) => void,
  done: () => void,
}

export function CheckoutPage({ selectedFilm, showAlert, done }: ICheckoutPageProps) {

  const [selectedSession, setSelectedSession] = useState<ISeats>();
  const [bookingName, setBookingName] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingSeats, setBookingSeats] = useState<string[]>([]);

  useEffect(() => {
    fetchBookings();
  }, [selectedSession])

  const fetchBookings = async () => {
    if (selectedSession) {
      try {
        const data: IBookings[] = await FilmsService.listBookings(selectedFilm.id, selectedSession.session);
        
        setBookingSeats(data.flatMap(obj => obj.seats));
      } catch (error) {
        console.error(error);
        showAlert("Ocorreu um erro carregar assetos", "error");
        setSelectedSeats([]);
      }
    }
  };

  function toogleSeatClick(seat: string) {
    setSelectedSeats(prev => prev.includes(seat) ? prev.filter(i => i !== seat) : [...prev, seat]);
  }

  async function handleBookingSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!bookingName) {
      showAlert("Informar o nome da reserva", "error")
      return;
    }

    if (!selectedSession) {
      showAlert("Ocorreu um erro ao inesperado", "error")
      return;
    }

    const payload = { filmId: selectedFilm.id, session: selectedSession.session, name: bookingName, seats: selectedSeats, value: selectedSession.value * selectedSeats.length };

    try {
      const data = await FilmsService.toBooking(payload);
      showAlert("Reserva efetuada com sucesso!", "success");
      done();
    } catch (error) {
      console.error(error);
      showAlert("Ocorreu um erro ao reservar assento",  "error");
      setSelectedSeats([]);
    }

  }

  return (
    <>
      <Container maxWidth={false}>
        <Typography variant='h2' sx={{ margin: "4rem 0" }}>Quando e onde assistir?</Typography>
        <Grid container spacing={2} rowGap={2}>
          <Grid item xs={12} display="grid" gridTemplateColumns="3fr 1fr" gridTemplateRows="repeat(1fr, auto)" gap={1}>
            <Paper sx={{ gridRow: '1', padding: "1rem", display: "flex", gap: "1rem" }}>
              <Typography variant='h6'>Qual sessão?</Typography>
              {selectedFilm.sessions.map(s =>
                <Chip key={s.session} label={s.session} variant={s.session === selectedSession?.session ? "filled" : "outlined"} onClick={() => setSelectedSession(s)} />
              )}
            </Paper>
            {selectedSession &&
              <Paper sx={{ gridRow: '2 / 4', padding: "1rem" }}>
                <Typography variant='h6'>Selecione seu(s) assento(s)</Typography>
                <Typography variant='h6' margin=" 1rem 0" sx={{ textAlign: "center", border: "1px solid", borderColor: "primary.default" }}>Tela</Typography>
                <SeatsComponent lockSeats={bookingSeats} selectedSeats={selectedSeats} toogleSeatClick={toogleSeatClick} />
              </Paper>
            }
            <Paper sx={{ gridColumn: '2', gridRow: 'span 3', padding: "1rem" }}>
              <Grid display={"flex"} flexDirection={"column"} gap={3} >
                <Box display={"flex"} flexDirection={"column"} rowGap={1}>
                  <img src={selectedFilm.url} style={{ height: '400px', borderRadius: "10px", margin: "0 auto" }} />
                  <Typography variant='h5'>{selectedFilm.name}</Typography>
                  <Typography variant='body1' sx={{ textAlign: 'justify' }}><strong>Sinopse:</strong> {selectedFilm.sinopse}</Typography>
                </Box>

                {Boolean(selectedSeats.length) &&
                  <>
                    <Box>
                      <Typography variant='subtitle2'>Carrinho</Typography>
                      <List sx={{ width: '100%', padding: "1rem", bgcolor: 'background.paper' }}>
                        {selectedSeats.map(seat => (
                          <ListItem
                            key={seat}
                            disableGutters
                            secondaryAction={
                              <IconButton onClick={() => toogleSeatClick(seat)}>
                                <DeleteOutlineIcon />
                              </IconButton>
                            }
                          >
                          {selectedSession && <ListItemText primary={`Assento ${seat} (${formatter.format(selectedSession?.value)})`} />}
                          </ListItem>
                        ))}
                      </List>
                      { 
                        selectedSession && <Typography>Total: {formatter.format((selectedSeats.length * selectedSession?.value) | 0)}</Typography>
                      }
                    </Box>
                    <form onSubmit={(e) => handleBookingSubmit(e)}>
                      <Box display="flex" flexDirection="column" gap={2} >
                        <TextField
                          name='name'
                          label="Nome"
                          placeholder='Responsável pela reserva'
                          value={bookingName}
                          onChange={({ target }) => setBookingName(target.value)}
                        />
                        <Button disabled={bookingName ? false : true} type='submit' variant='contained'>Confirmar</Button>
                      </Box>
                    </form>
                  </>
                }
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}