import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../api/agent";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { LoginContext } from "../context/LoginContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const { setUserId, userId, setUserName } = useContext(LoginContext);

  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  function submitForm(data: FieldValues) {
    setIsLoading(true);
    agent.Users.loginUser(data)
      .then((response) => {
        localStorage.setItem("username-eshop", response.user.username);
        setUserName(response.user.username);
        setLoggedUser(response);
        localStorage.setItem("userId-eshop", response.user.pk);
        setUserId(response.user.pk);
        toast.success(response.message || "Login Successful");
        navigation("/");
      })
      .catch((error) => {
        toast.error(error.response.data.non_field_errors[0]);
      })
      .finally(() => setIsLoading(false));
  }

  if (isLoading) {
    return <LoadingComponent message="Logging In" />;
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        mt: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <LoadingButton
          disabled={!isValid || loggedUser != null}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {userId === null ? "Sing In" : "You Already Logged In"}
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/Register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
