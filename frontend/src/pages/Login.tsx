import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../api/agent";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import { LoginContext } from "../context/LoginContext";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { Button } from "@mui/base";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const { setUserId, userId, setUserName } = useContext(LoginContext);

  const navigation = useNavigate();
  const location = useLocation();
  const state = location.state as { from: Location; redirectTo: string } | null;
  const redirectTo = state?.redirectTo || "/";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  const submitForm = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await agent.Users.loginUser(data);

      localStorage.setItem("username-eshop", response.user.username);
      localStorage.setItem("userId-eshop", response.user.pk);
      setUserName(response.user.username);

      setLoggedUser(response);
      setUserId(response.user.pk);
      await agent.Token.retrieveToken();
      toast.success(response.message || "Login Successful");
      navigation(redirectTo, { replace: true });
    } catch (error: any) {
      toast.error(error.response?.data?.non_field_errors[0] || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoogleLoginSuccess = (credentialResponse: any) => {
  //   console.log(credentialResponse);

  //   const decodedToken = jwtDecode(credentialResponse.credential);
  
  //   toast.success("Login Successful");
  
  //   localStorage.setItem("username-eshop", decodedToken.email);
  //   localStorage.setItem("userId-eshop", decodedToken.sub);
  //   setUserId(decodedToken.sub);
  //   setUserName(decodedToken.name);
  
  //   navigation(redirectTo, { replace: true });
  // };

  const handleGoogleLoginSuccess = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const tokens = await axios.post(
          'http://localhost:8000/api/auth/google/connect/', {
              code: codeResponse.code
          
              //access_token: codeResponse.access_token,
              //id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkYzRlMTA5ODE1ZjQ2OTQ2MGU2M2QzNGNkNjg0MjE1MTQ4ZDdiNTkiLCJ0eXAiOiJKV1QifQ"
          });

      console.log(tokens);
  },
  onError: errorResponse => console.log(errorResponse),
});


  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
    // Handle the Google login error logic here
  };

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
          autoComplete="current-username"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
          autoComplete="current-password"
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
        <Button onClick={() => handleGoogleLoginSuccess()}> Sign in with Google</Button>
        <Grid container>
          <Grid item>
            <Link to="/Register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

