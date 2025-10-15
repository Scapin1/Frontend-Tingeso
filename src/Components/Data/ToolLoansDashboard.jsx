import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Box, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToolLoansChart from "./ToolLoansChart";
import MostRequestedToolCard from "./MostRequestedToolCard";
import TopClientsList from "./TopClientsList";
import TopOverdueClientsList from "./TopOverdueClientsList";
import kardexService from "../../Services/kardex.service.js";
import Stack from '@mui/material/Stack';
import ToolWithMostOverduesCard from "./ToolWithMostOverduesCard";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TabContext, TabList, TabPanel} from '@mui/lab';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme.js';
import MostRequestedToolInRangeCard from "./MostRequestedToolInRangeCard";
import RequestedToolsInRangeChart from "./RequestedToolsInRangeChart";
import ToolWithMostOverduesInRangeCard from "./ToolWithMostOverduesInRangeCard";
import TopClientsInRangeList from "./TopClientsInRangeList";
import TopOverdueClientsInRangeList from "./TopOverdueClientsInRangeList";


const ToolLoansDashboard = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [filteredLoading, setFilteredLoading] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        kardexService.getLoanByMonthAndToolName()
            .then(response => setRawData(response.data))
            .finally(() => setLoading(false));
    }, []);

    const handleFilter = async () => {
        if (!dateFrom || !dateTo) return;
        setFilteredLoading(true);
        setTimeout(() => {
            setFilteredLoading(false);
        }, 1000);
    };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TabContext value={value}>
                <TabList
                    onChange={handleChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        backgroundColor: colors.primary[500],
                        borderRadius: 2,
                        minHeight: 48,
                        '& .MuiTab-root': {
                            color: colors.grey[500],
                            fontWeight: 600,
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: colors.greenAccent[400],
                        },
                    }}
                >
                    <Tab label="Global" value="1" sx={{ '&.Mui-selected': { color: colors.greenAccent[500] } }} />
                    <Tab label="Por rango de fechas" value="2" sx={{ '&.Mui-selected': { color: colors.greenAccent[500] } }} />
                </TabList>
                {/* GLOBAL SECTION */}
                <TabPanel value="1">
                    <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                        <Grid item xs={12} md={8}>
                            <ToolLoansChart rawData={rawData} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={2}>
                                <MostRequestedToolCard />
                                <ToolWithMostOverduesCard />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TopClientsList />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TopOverdueClientsList />
                        </Grid>
                        <Grid item xs={false} md={4} />
                    </Grid>
                </TabPanel>
                {/* FILTRABLE POR RANGO DE FECHAS */}
                <TabPanel value="2">
                    <Box mt={2} mb={2}>
                        <Box display="flex" gap={2} alignItems="center" mb={2}>
                            <DatePicker
                                label="Desde"
                                value={dateFrom}
                                onChange={setDateFrom}
                                slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
                            />
                            <DatePicker
                                label="Hasta"
                                value={dateTo}
                                onChange={setDateTo}
                                slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
                            />
                            <Button variant="contained" color="primary" onClick={handleFilter} disabled={!dateFrom || !dateTo || filteredLoading}>
                                Filtrar
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => { setDateFrom(null); setDateTo(null); }} disabled={!dateFrom && !dateTo}>
                                Limpiar
                            </Button>
                        </Box>
                        <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                            <Grid item xs={12} md={8}>
                                <RequestedToolsInRangeChart dateFrom={dateFrom} dateTo={dateTo} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Stack spacing={2}>
                                    <MostRequestedToolInRangeCard dateFrom={dateFrom} dateTo={dateTo} />
                                    <ToolWithMostOverduesInRangeCard dateFrom={dateFrom} dateTo={dateTo} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TopClientsInRangeList dateFrom={dateFrom} dateTo={dateTo} />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TopOverdueClientsInRangeList dateFrom={dateFrom} dateTo={dateTo} />
                            </Grid>
                            <Grid item xs={false} md={4} />
                        </Grid>
                    </Box>
                </TabPanel>
            </TabContext>
        </LocalizationProvider>
    );
};

export default ToolLoansDashboard;
