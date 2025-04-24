import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <Typography variant="h3" gutterBottom>
        Acesso Negado
      </Typography>
      <Typography variant="body1" gutterBottom>
        Você não tem permissão para acessar esta página.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Voltar para o início
      </Button>
    </Box>
  );
};
