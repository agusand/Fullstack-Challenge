import Typography from "@mui/material/Typography";

export default function ErrorMessage({ message }: { message: string }) {
    return (
        <Typography component="p" color="red">
            {message}
        </Typography>
    );
}
