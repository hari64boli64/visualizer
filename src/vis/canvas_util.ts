import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTextFieldViolet = styled(TextField)<TextFieldProps>(({ theme: any }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "Violet",
    },
  },
}));

const MyTextFieldPurple = styled(TextField)<TextFieldProps>(({ theme: any }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "purple",
    },
  },
}));

export { MyTextFieldViolet, MyTextFieldPurple };
