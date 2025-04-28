import { useEffect, useState } from "react";
import { SelectionPage } from "../SelectionPage";
import { IShowAlertProps } from "../../alert/interface/IShowAlertProps.interface";
import { IFilms } from "../interface/IFilms.interface";
import AdminPanel from "./AdminPanel";
import { Typography } from "@mui/material";
import { IBookings } from "../interface/IBookings.interface";
import { FilmsService } from "../../services/FilmsService";

export default function Admin() {

  const [selectedFilm, setSelectedFilm] = useState<IFilms>();
  const [showAlert, setshowAlert] = useState<IShowAlertProps>();
  const [bookings, setBookings] = useState<IBookings[]>([]);

  useEffect(() => {
    if(selectedFilm){
      requestBookingFilmId(selectedFilm.id)
    }
  }, [selectedFilm])

  async function requestBookingFilmId(id: string){
    try {
      const data: IBookings[] = await FilmsService.listBookingsIdFilm(id);
      setBookings(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SelectionPage
        setSelectedFilm={setSelectedFilm}
        showAlert={(message) =>
          setshowAlert({ message })
        }
        titleCustom="Gestão Fácil Flix"
        isVisibleAppBar={false}
        adminRoute={true}
      />
      {
        !selectedFilm ? 
        <>
          <Typography marginTop={3} textAlign={'center'} fontWeight={600} fontSize={'64px'}>SELECIONE UM FILME</Typography>
          <Typography marginBottom={3} textAlign={'center'}  fontSize={'24px'}>Para visualizar mais detalhes</Typography>
        </> :
        <AdminPanel urlPoster={selectedFilm.url} filmName={selectedFilm.name} bookings={bookings} />
      }
    </>
  )
}
