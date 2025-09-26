import {Box, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {tokens} from "../../theme.js";

const CustomTable = ({rows, columns}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
    <Box
        height="70vh"
        sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { borderBottom: "none" },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
            },
        }}
    >
        <DataGrid rows={rows} columns={columns} />
    </Box>
    )

}
export default CustomTable;