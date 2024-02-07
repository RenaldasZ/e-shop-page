import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import agent from "../api/agent";
import { toast } from "react-toastify";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

interface IFormInput {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm<IFormInput>({ mode: "onTouched" });

  const navigation = useNavigate();

  const validatePassword = (value: string) => {
    if (value === watch("password1")) {
      return true;
    }
    return "The passwords do not match";
  };

  function registerForm(data: IFormInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const { password2, ...regData } = data;
    console.log(data);
    agent.Users.registerUser(data)
      .then(() => {
        toast.success("Registration Successful");
        navigation("/Login");
      })
      .catch((error) => {
        
        const errorDetails = error.response.data;
        const errorMessages = [];

        if (errorDetails.username && errorDetails.username.length) {
          errorMessages.push(...errorDetails.username);
        }
        if (errorDetails.email && errorDetails.email.length) {
          errorMessages.push(...errorDetails.email);
        }
        const messageToShow =
          errorMessages.length > 0 ? errorMessages.join(" ") : "An unexpected error occurred. Please try again.";
        toast.error(messageToShow);
      });
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
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
        <AppRegistrationIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit(registerForm)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          label="Username"
          {...register("username", { required: "Username is Required" })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="First name"
          {...register("first_name", { required: "First name is Required" })}
          error={!!errors.first_name}
          helperText={errors?.first_name?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Last name"
          {...register("last_name", { required: "Last name is Required" })}
          error={!!errors.last_name}
          helperText={errors?.last_name?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}":;'?/>.<,]).{6,}/,
              message: "Password does not meet complexity requirements",
            },
          })}
          error={!!errors.password1}
          helperText={errors?.password1?.message as string}
          autoComplete="current-newPassword"
        />
        <TextField
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("password2", {
            required: "Please confirm your password",
            validate: validatePassword,
          })}
          error={!!errors.password2}
          helperText={errors?.password2?.message as string}
          autoComplete="current-confirmPassword"
        />
        <LoadingButton
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/Login">{"Already have an account? Sign In"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
