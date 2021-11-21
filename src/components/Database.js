import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import MyModal from "./Modal";
import Button from "@mui/material/Button";



export default function Database(props) {

    const [selectedRow, setSelectedRow] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
    const data = props.mData;
    const row = data.filter((row) => row.id == id);
    setSelectedRow(row);
    setOpen(true);
    // console.log("row", row);
  };

  const closeModal = () => {
    setOpen(false);
  };

    return (<>
    {open && (
        <MyModal
          open={open}
          selectedRow={selectedRow}
          closeModal={() => closeModal()}
        />
      )}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="compare table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                Full Name
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                Experience
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                Latest Employer
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                Inferred Salary in USD
              </TableCell>
              
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                Location
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  backgroundColor: "#141414",
                  color: "#fff",
                  maxHeight: "40px",
                }}
              >
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mData.map((row, id) => (
              <TableRow key={id}>
                <TableCell align="left">{row.full_name.toUpperCase()}</TableCell>
                <TableCell align="left">
                  {row?.inferred_years_experience}
                </TableCell>
                <TableCell align="left">
                  {row.job_company_name.toUpperCase()}
                </TableCell>
                <TableCell align="left">{row.inferred_salary}
                </TableCell>
                <TableCell align="left">{row.location_region.toUpperCase()}</TableCell>
                <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        id={row.id}
                        onClick={(e) => {
                          handleOpen(e.target.id);
                        }}
                      >
                        Profile
                      </Button>
                    </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
  }