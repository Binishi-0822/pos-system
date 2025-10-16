import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const DataGridTable = ({columns,rows}) => {

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div>
      
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              },
              "& .MuiDataGrid-columnHeaderTitleContainer": {
                justifyContent: "center",
              },
              "& .MuiDataGrid-cell": {
                justifyContent: "center",
                textAlign: "center",
              },
            }}
          />
        </Paper>
    </div>
  );
};

export default DataGridTable;
