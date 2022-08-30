import * as React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import { Link } from "react-router-dom";

const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <AutoGraphIcon />
      </ListItemIcon>
      <ListItemText primary="Visualizer" />
    </ListItemButton>
    <ListItemButton component={Link} to="/problem">
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Problems" />
    </ListItemButton>
  </React.Fragment>
);

export default mainListItems;
