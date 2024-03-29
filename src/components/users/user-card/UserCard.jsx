import "./usercard.scss";
import React, {useState} from "react";
import { useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { getLoggedUser } from "../../../utils/http-utils/User-request";

const UserCard = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const loggedUser = getLoggedUser();
  const [newUser, setNewUser] = useState({
    role: {
      admin: "",
      user: "",
    }
  })

  const redirectToDetails = () => {
    navigate(`/user/${user.id}`);
  };

  const redirectToEdit = () => {
    navigate(`/user/edit/${user.id}`);
  };

  if (!user) {
    return <h1 className="p-lead">No user!</h1>;
  }

  return (
    <div className="user-card-wrapper">
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt="User" image={user.picture} />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {user.name}
          </Typography>
          <Typography>
            <span className="key">Address:</span>
            <span className="value"> {user.address}</span>
          </Typography>
          <Typography>
            <span className="key">E-mail:</span>
            <span className="value"> {user.email}</span>
          </Typography>
          <Typography>
            <span className="key">Phone:</span>
            <span className="value"> {user.phone}</span>
          </Typography>
        </CardContent>
        <CardActions>
          <div className="btn-holder">
            {loggedUser.role === 'admin' ? (
              <>
              <EditIcon
                color="success"
                onClick={redirectToEdit}
                className="edit"
              />
              <InfoIcon
              color="primary"
              onClick={redirectToDetails}
              className="info"
              />
              <DeleteIcon
                color="error"
                onClick={() => deleteUser(user.id)}
                className="delete"
              />
              </>
            ): (
              <InfoIcon
                color="primary"
                onClick={redirectToDetails}
                className="info"
              />

            )}
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default UserCard;
