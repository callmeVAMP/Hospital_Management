import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  FileDownload as FileDownloadIcon,
  ViewColumn as ViewColumnIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const mockTreatments = [
  {
    id: 1,
    treatmentName: "Chemotherapy",
    sDate: "2024-01-15",
    eDate: "2024-02-15",
  },
  {
    id: 2,
    treatmentName: "Radiation Therapy",
    sDate: "2024-03-01",
    eDate: "2024-04-01",
  },
];

const TreatmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const filteredTreatments = mockTreatments.filter((t) =>
    t.treatmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTreatments = filteredTreatments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ px: 3, py: 2 }}>
      {/* Title */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Treatments List
      </Typography>

      {/* Header Toolbar */}
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          borderRadius: 2,
          px: 2,
          py: 1.5,
          mb: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Treatments
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
          <Tooltip title="Toggle Columns">
            <IconButton>
              <ViewColumnIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Treatment">
            <IconButton color="success">
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export CSV">
            <IconButton>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Treatment Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTreatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>{treatment.treatmentName}</TableCell>
                <TableCell>{treatment.sDate}</TableCell>
                <TableCell>{treatment.eDate}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <TablePagination
          component="div"
          count={filteredTreatments.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 100]}
          sx={{
            borderTop: "1px solid #e0e0e0",
            px: 2,
            py: 1,
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default TreatmentList;
