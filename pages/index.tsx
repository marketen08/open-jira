import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/entries";

const HomePage:NextPage = () => {
  return (
    <Layout>
      
      <Grid container spacing={ 2 }>

        <Grid item xs={12} sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes" sx={{ backgroundColor: 'gray', color: 'white'}} />
            <NewEntry />
            <EntryList status='pending' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={ 4 } >
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En Progreso" sx={{ backgroundColor: 'gray', color: 'white'}} />
            <EntryList status='in-progress' />
          </Card>
        </Grid>

        <Grid item xs={12} sm={ 4 }>
          <Card sx={{ height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas" sx={{ backgroundColor: 'gray', color: 'white'}} />
            <EntryList status='finished' />
          </Card>
        </Grid>

      </Grid>
      
    </Layout>
  )
}

export default HomePage;