import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Table, TableHead, TableRow } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useHistory } from "react-router";

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

const Home = () => {
  const [usersList, setUsersList] = useState(null);
  const classes = useStyles();
  let history = useHistory();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://cabadminbackend.herokuapp.com/rides");
        setUsersList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  let users = [];
  // let rideIds = [];
  // let ridestatus = [];
  if (usersList) {
    for (const [name, value] of Object.entries(usersList)) {
      users.push(name);
      // for (const [rideId, status] of Object.entries(value.tripStatus)) {
      //   rideIds.push(rideId);
      //   ridestatus.push(status.status);
      //   // console.log(rideId,status.status)
      // }
    }
  }
  console.log(users);

  return (
    <div>
      {usersList && usersList.length !== 0 ? (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    history.push(`/user/${user}`);
                  }}
                >
                  {user}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                No users booked ride
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Home;
