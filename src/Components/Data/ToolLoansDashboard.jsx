import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Container, Typography, Box, Button } from "@mui/material";
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


const ToolLoansDashboard = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [filteredLoading, setFilteredLoading] = useState(false);
    const [filteredData, setFilteredData] = useState({
        chart: [],
        mostRequestedTool: null,
        toolWithMostOverdues: null,
        topClients: [],
        topOverdueClients: []
    });

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
            setFilteredData({
                chart: [],
                mostRequestedTool: null,
                toolWithMostOverdues: null,
                topClients: [],
                topOverdueClients: []
            });
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
                    sx={{
                        backgroundColor: colors.primary[500],
                        borderRadius: 2,
                        minHeight: 48,
                        '& .MuiTab-root': {
                            color: colors.grey[500],
                            fontWeight: 600,
                        },
                        '& .Mui-selected': {
                            color: colors.greenAccent[400],
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: colors.greenAccent[400],
                        },
                    }}
                >
                    <Tab label="Global" value="1" />
                    <Tab label="Por rango de fechas" value="2" />
                </TabList>
                {/* GLOBAL SECTION */}
                <TabPanel value="1">
                    <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                        <Grid item xs={12} md={8} lg={8} xl={8}>
                            <ToolLoansChart rawData={rawData} />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <Stack spacing={2}>
                                <MostRequestedToolCard />
                                <ToolWithMostOverduesCard />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TopClientsList />
                        </Grid>
                        <Grid item xs={12} md={4} lg={4} xl={4}>
                            <TopOverdueClientsList />
                        </Grid>
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
                        </Box>
                        <Grid container spacing={3} sx={{ minHeight: '50vh' }}>
                            <Grid item xs={12} md={8} lg={8} xl={8}>
                                <Box sx={{ height: 200, bgcolor: colors.primary[800], borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body1" color={colors.grey[300]}>(Gráfico filtrado por fechas)</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} xl={4}>
                                <Stack spacing={2}>
                                    <Box sx={{ height: 140, bgcolor: colors.greenAccent[700], borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body2" color={colors.grey[100]}>(Herramienta más arrendada filtrada)</Typography>
                                    </Box>
                                    <Box sx={{ height: 140, bgcolor: colors.redAccent[700], borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="body2" color={colors.grey[100]}>(Herramienta con más atrasos filtrada)</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} xl={4}>
                                <Box sx={{ height: 200, bgcolor: colors.blueAccent[700], borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color={colors.grey[100]}>(Top clientes filtrado)</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} xl={4}>
                                <Box sx={{ height: 200, bgcolor: colors.redAccent[400], borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="body2" color={colors.grey[100]}>(Clientes con más atrasos filtrado)</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>
            </TabContext>
        </LocalizationProvider>
    );
};

export default ToolLoansDashboard;
