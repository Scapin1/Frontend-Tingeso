import React, { useEffect, useState } from "react";
import {Grid, CircularProgress, Container, Stack} from "@mui/material";
import ToolLoansChart from "./ToolLoansChart";
import MostRequestedToolCard from "./MostRequestedToolCard";
import TopClientsList from "./TopClientsList";
import kardexService from "../../Services/kardex.service.js";

const ToolLoansDashboard = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        kardexService.getLoanByMonthAndToolName()
            .then(response => setRawData(response.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <ToolLoansChart rawData={rawData} />
                </Grid>
                <Stack spacing={2} direction="column">
                    <MostRequestedToolCard />
                    <TopClientsList />
                </Stack>
            </Grid>
        </Container>
    );
};

export default ToolLoansDashboard;
