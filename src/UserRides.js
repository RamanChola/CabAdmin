import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button, Table, TableHead, TableRow } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: "650px",
    position: "absolute",
    top: "100px",
    left: "300px",
    "@media (max-width: 600px)": {
      left: "10px",
      maxWidth: "300px",
    },
  },
});

const UserRides = () => {
  const [ridesList, setRidesList] = useState(null);
  const classes = useStyles();
  const uid = useParams().userId;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/rides/${uid}/tripStatus/`
        );
        setRidesList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const handleStatus = async (rideId) => {
    console.log(rideId);
    try {
      await axios.post(
        `http://localhost:8000/rides/${uid}/tripStatus/book/${rideId}/`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDecline = async (rideId) => {
    console.log(rideId);
    try {
      await axios.post(
        `http://localhost:8000/rides/${uid}/tripStatus/decline/${rideId}/`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  let history = useHistory();

  return (
    <div>
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        <ArrowBackIcon /> Go back to users list
      </Button>
      {ridesList && ridesList.length !== 0 ? (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ride ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(ridesList).map((rideId, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ cursor: "pointer" }}
                >
                  {rideId[0]}
                </StyledTableCell>
                <StyledTableCell>
                  {rideId[1].status}
                  <Button
                    style={{
                      display:
                        rideId[1].status === ("isSearching")
                          ? "inlineBlock"
                          : "none",
                      marginLeft: "30px",
                      backgroundColor: "#00b300",
                      color: "white",
                    }}
                    variant="contained"
                    onClick={(e) => {
                      handleStatus(rideId[0]);
                    }}
                  >
                    BOOK
                  </Button>
                  <Button
                    style={{
                      display:
                        rideId[1].status === "Booked"
                          ? "inline-block"
                          : "none",
                      marginLeft: "55px",
                      backgroundColor: "#FF0000",
                      color: "white",
                    }}
                    onClick={(e) => {
                      handleDecline(rideId[0]);
                    }}
                  >
                    Decline
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ride ID</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                No rides booked by this user
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                N/A
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserRides;
