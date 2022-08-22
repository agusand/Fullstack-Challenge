import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Card from "@mui/material/Card";

import { useAuthContext } from "../contexts/AuthContext";

const UserCard = () => {
    const { user } = useAuthContext();

    return (
        <Card
            variant="outlined"
            sx={{
                width: "27rem",
                height: "27rem",
                maxWidth: "50vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#555",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5" color="white">
                    User info
                </Typography>
                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        alt={user?.name}
                        src={user?.avatar}
                        sx={{ width: 100, height: 100, my: 4 }}
                    />
                    <ListItemText sx={{ color: "white" }}>
                        Name: {user?.name}
                    </ListItemText>
                    <ListItemText sx={{ color: "white" }}>
                        Surname: {user?.surname}
                    </ListItemText>
                    <ListItemText sx={{ color: "white" }}>
                        Age: {user?.age}
                    </ListItemText>
                    <ListItemText sx={{ color: "white" }}>
                        E-mail: {user?.email}
                    </ListItemText>
                    <ListItemText sx={{ color: "white" }}>
                        Role: {user?.role}
                    </ListItemText>
                </List>
            </Box>
        </Card>
    );
};

export default UserCard;
