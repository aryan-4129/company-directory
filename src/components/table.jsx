import * as React from "react";


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  backdropClasses,
  Box,
} from "@mui/material";

export default function CustomDataTable({ data }) {
  const columnHeaders = [
    { key: "name", label: "Name", align: "left" },
    { key: "serviceType", label: "Service Type", align: "left" },
    { key: "location", label: "Location", align: "left" },
    { key: "description", label: "Description", align: "left" },
    { key: "employeeCount", label: "Employee Count", align: "right" },
  ];

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} style={{width: '100%', maxHeight: '70vh'}}>
      <Table  aria-label="company data table">
        {/* === TABLE HEADER === */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
            {columnHeaders.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                sx={{ fontWeight: "bold" }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.name || index}
              sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
            >
              {columnHeaders.map((column) => (
                <TableCell
                  key={column.key}
                  align={column.align}
                  {...(column.key === "description" && {
                    sx: {
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontSize: "0.85rem",
                    },
                  })}
                >
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
