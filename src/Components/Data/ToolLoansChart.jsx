import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { tokens } from "../../theme";

const ToolLoansChart = ({ rawData }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Prepare chart data
    const { data, toolNames, months } = useMemo(() => {
        const grouped = {};
        const toolsSet = new Set();
        rawData.forEach(item => {
            const month = item.month;
            if (!grouped[month]) grouped[month] = {};
            const tool = item.toolName || "Sin herramienta";
            grouped[month][tool] = item.count;
            toolsSet.add(tool);
        });
        const monthsArr = Object.keys(grouped).sort((a, b) => a - b);
        const toolsArr = Array.from(toolsSet);
        const chartData = monthsArr.map(month => {
            const entry = { month };
            toolsArr.forEach(tool => {
                entry[tool] = grouped[month][tool] || 0;
            });
            return entry;
        });
        return { data: chartData, toolNames: toolsArr, months: monthsArr };
    }, [rawData]);

    // Bar colors (distinct from background)
    const barPalette = [
        "#1976d2", "#9c27b0", "#ff9800", "#43a047", "#e53935", "#00acc1"
    ];

    const series = toolNames.map((tool, idx) => ({
        data: data.map(item => item[tool] || 0),
        label: tool,
        stack: "total",
        color: barPalette[idx % barPalette.length],
    }));

    return (
        <Card sx={{ background: colors.primary[400], display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    sx={{ color: colors.greenAccent[400], fontWeight: 700 }}
                >
                    Préstamo de Herramientas por Mes
                </Typography>
                <Box sx={{ borderRadius: 2, p: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BarChart
                        xAxis={[{ data: months, scaleType: "band", label: "Month" }]}
                        series={series}
                        height={350}
                        legend={{ position: { vertical: "top", horizontal: "right" } }}
                        sx={{
                            borderRadius: 2,
                            "& .MuiChartsAxis-root": { color: theme.palette.text.primary },
                            "& .MuiChartsLegend-root": { color: theme.palette.text.primary },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ToolLoansChart;
