import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import { toast } from "react-toastify";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    if (value === watch("password")) {
      return true;
    }
    return "The passwords do not match";
  };

  function registerForm(data: IFormInput) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...regData } = data;
    agent.Users.registerUser(regData)
      .then(() => {
        toast.success("Registration Successful");
        navigation("/");
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
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
          label="Password"
          type="password"
          {...register("password", {
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
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: validatePassword,
          })}
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message as string}
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
