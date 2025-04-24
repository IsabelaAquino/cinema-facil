import { Grid, IconButton } from "@mui/material";
import ChairIcon from '@mui/icons-material/Chair';

interface ISeatsComponentProps {
  selectedSeats: string[],
  lockSeats: string[],
  toogleSeatClick: (seat: string) => void,
}
export default function SeatsComponent({selectedSeats, lockSeats, toogleSeatClick}: ISeatsComponentProps) {
    const CINEMA_ROOM_SIZE = Object.freeze({
        rows: 10,
        columns: 15,
    });

    return (
    <Grid display={"flex"} flexDirection={'column'} alignItems={"center"}>
        {Array.from({ length: CINEMA_ROOM_SIZE.rows + 1 }).map((_, r) =>
        <Grid key={r} item>
            {Array.from({ length: CINEMA_ROOM_SIZE.columns }).map((_, c) => {
            const seat = `${String.fromCharCode(r + 65)}${c + 1}`;
            return (
                <IconButton key={c} title={seat} disabled={lockSeats.includes(seat)} onClick={() => toogleSeatClick(seat)}>
                {selectedSeats.includes(seat) ? <ChairIcon color='primary' /> : <ChairIcon />}
                </IconButton>
            )
            })}
        </Grid>
        )}
    </Grid>
    )
}
