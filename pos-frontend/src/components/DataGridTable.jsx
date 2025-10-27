import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const DataGridTable = ({ columns, rows, isSearch=""}) => {
  const paginationModel = { page: 0, pageSize: 5 };

  // Custom overlay for empty rows
  const CustomNoRowsOverlay = () => (
    <GridOverlay>
      <div style={{ textAlign: "center", padding: "1rem", width: "100%" }}>
        {isSearch ? "No products match your search." : "No rows available."}
      </div>
    </GridOverlay>
  );

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
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
  );
};

export default DataGridTable;
