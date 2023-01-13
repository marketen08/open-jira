import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/layouts/ui";

const HomePage:NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      
      <Grid container spacing={ 2 }>

        <Grid item xs={12} sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" />

              {/* Agregar una nueva entrada */}
              {/* Listado de entradas */}

              <NewEntry />
              <EntryList status='pending' />

          </Card>
        </Grid>

        <Grid item xs={12} sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En Progreso" />
            <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas" />
            <EntryList status='finished' />
          </Card>
        </Grid>

      </Grid>
      
    </Layout>
  )
}

export default HomePage;