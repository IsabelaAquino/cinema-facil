import { Avatar, Box, Card, CardContent, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { IBookings } from "../interface/IBookings.interface";


interface IAdminPanelProps {
    bookings: IBookings[],
    filmName: string,
    urlPoster: string,
}

export default function AdminPanel({bookings, filmName, urlPoster}: IAdminPanelProps) {
    const isMobile = useMediaQuery('(max-width:950px)');
   
    function sumTotalViewers(){

        const totalViewers = bookings.reduce((sum, booking) => sum + booking.seats.length, 0);
        return totalViewers;
    }

    function sumTotalRevenue(){
        const totalRevenue = bookings.reduce((sum, booking) => sum + booking.value, 0);
        return totalRevenue;
    }

    const groupBySession = (bookings: IBookings[]) => {
        const group: { [session: string]: IBookings[] } = {};
        
        bookings.forEach(booking => {
            if (!group[booking.session]) {
            group[booking.session] = [];
            }
            group[booking.session].push(booking);
        });
        
        return group;
    };

    const bookingsBySession = groupBySession(bookings);
    
    return (
        <Container maxWidth={false} sx={{ maxWidth: "95%", py: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
                <Box display={'flex'} flexDirection={isMobile ? "column" : "row"} sx={{ mb: 3, gap: 2 }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            borderRadius: '10px',
                            width: isMobile ? 80 : 150,
                            height: isMobile ? 120 : 200,
                            alignSelf: isMobile ? "center" : "flex-start",
                        }}
                        src={urlPoster} 
                        alt="poster do filme"
                    />

                    <Box sx={{display: 'flex',  justifyContent: 'space-between', flexDirection: 'column', flexGrow: 1, marginLeft: isMobile ? 0 : '20px' }}>
                        <Typography
                            variant="h5"
                            component="h1"
                            gutterBottom
                            sx={{
                            fontWeight: "bold",
                            mt: isMobile ? 1 : 0,
                            }}
                        >
                            {filmName}
                        </Typography>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                            <Card sx={{bgcolor: "background.paper", height: "100%", borderRadius: '24px' }}>
                                <CardContent sx={{padding: '30px', display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? 'flex-start' : 'center'}}>
                                <Typography maxWidth={isMobile ? "400px" : '200px'} fontSize={isMobile? '30px' : '40px'} fontWeight={600}>
                                    Total de Espectadores
                                </Typography>
                                <Typography variant="h4" component="div">
                                    {sumTotalViewers()}
                                </Typography>
                                </CardContent>
                            </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Card sx={{bgcolor: "background.paper", height: "100%", borderRadius: '24px' }}>
                                <CardContent sx={{padding: '30px', display: 'flex', flexDirection: isMobile ? "column" : "row", justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center'}}>
                                    <Typography maxWidth={isMobile? '400px' : '200px'} fontSize={isMobile? '30px' : '40px'} fontWeight={600}>
                                        Total de Receita 
                                    </Typography>
                                    <Typography variant="h4" component="div">
                                        {sumTotalRevenue().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </Typography>
                                </CardContent>
                            </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {Object.entries(bookingsBySession).map(([session, bookings]) => (
                    <Box key={session} sx={{ mb: 4 }}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600, fontSize: isMobile ? '30px' : '40px' }}>
                            Sessão {session} 
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{
                            bgcolor: "background.paper",
                            borderRadius: 6,
                            overflow: "hidden",
                            }}
                        >   
                            <Box sx={{ bgcolor: '#252525', padding: '30px'}}>
                                <TableContainer component={Box}>
                                <Table size={isMobile ? "small" : "medium"}>
                                    <TableHead>
                                    <TableRow>
                                        <TableCell sx={{border: 'none', color: "white", fontWeight: 600, fontSize: isMobile ? '20px' : '28px' }}>Nome</TableCell>
                                        <TableCell align="center" sx={{border: 'none', color: "white", fontWeight: 600, fontSize: isMobile ? '20px' : '28px' }}>
                                            Assento
                                        </TableCell>
                                        <TableCell align="right" sx={{ border: 'none', color: "white", fontWeight: 600, fontSize: isMobile ? '20px' : '28px' }}>
                                            Valor
                                        </TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {bookings.map((booking, i) => (
                                        <TableRow
                                        key={i}
                                        sx={{
                                            bgcolor: i % 2 === 0 ? "rgba(30, 30, 30, 0.8)" : "#252525",
                                            "&:hover": { cursor: 'pointer', bgcolor: "rgba(83, 83, 83, 0.8)" },
                                        }}
                                        >
                                        <TableCell sx={{fontSize: isMobile ? '18px' : '24px', border: 'none', borderBottomLeftRadius: '12px', borderTopLeftRadius: '12px'}} component="th" scope="row">
                                            {booking.name}
                                        </TableCell>
                                        <TableCell sx={{fontSize: isMobile ? '18px' : '24px', border: 'none'}} align="center">{booking.seats.join(", ")}</TableCell>
                                        <TableCell sx={{fontSize: isMobile ? '18px' : '24px', border: 'none', borderBottomRightRadius: '12px', borderTopRightRadius: '12px'}} align="right">{booking.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </Box>

                            <Box rowGap={isMobile? 3 : ''} display={"grid"} gridTemplateColumns={isMobile ? "none" : "2fr 1fr"} p={5} borderTop={'none'} marginLeft={1}>
                                <Typography fontSize={isMobile ? '24px' : '32px'} fontWeight={600} variant="body2">Total de Espectadores: {bookings.reduce((sum, booking) => sum + booking.seats.length, 0)}</Typography>
                                <Typography fontSize={isMobile ? '24px' : '32px'} fontWeight={600} variant="body2">
                                    Total de Receita: {bookings.reduce((acc, booking) => acc + booking.value, 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                   )
                )}
            </Box>
        </Container>
    )
}
