import Typography from "@mui/material/Typography";

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <Typography component="p" color="red">
            {message}
        </Typography>
    );
};

export default ErrorMessage;
