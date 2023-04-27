import { Box, TextField, Button } from "@mui/material";

//import useFormik to use formik in form
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserNameForm = () => {
  const nagivate = useNavigate();
  const [userName, setUserName] = useState(false);
  const [num, setNum] = useState(0);

  //check validation for form (Formik)
  const validate = (valuesCurrent: any) => {
    const errors = {
      userName: "",
      num: "",
    };
    if (!valuesCurrent.userName.trim()) {
      errors.userName = "required Name";

      setUserName(false);
    } else if (valuesCurrent.userName.trim().length < 3) {
      errors.userName = "Name must more than 3 characters";
      setUserName(false);
    }
    else
    {
      setUserName(true)
    }

    if (!valuesCurrent.num) {
      errors.num = "required number";
    } else if (valuesCurrent.num <1) {
      errors.num = "Number must be greater than 0";
    } else {
      setNum(valuesCurrent.num);
    }
    return errors;
  };

  //Function to Submit form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userName && num) {
      localStorage.setItem("userName", formik.values.userName);
      localStorage.setItem("num", formik.values.num);
      // localStorage.setItem("statusProgress", "Progress");
      nagivate("/exam");
    }
    console.log("donr");
    
  };

  //use useFormik
  const formik = useFormik({
    initialValues: {
      userName: "",
      num: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  //use keypress from keyboard
  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap:2
      }}
    >
      <TextField
        id="userName"
        label="Enter Your Name"
        value={formik.values.userName}
        onChange={formik.handleChange}
        error={formik.touched.userName}
        onKeyPress={onKeyPress}
        onBlur={formik.handleBlur}
        helperText={formik.errors.userName}
        required
      />

      <TextField
        id="num"
        label="Enter number of Questions"
        value={formik.values.num}
        onChange={formik.handleChange}
        error={formik.touched.num}
        onKeyPress={onKeyPress}
        onBlur={formik.handleBlur}
        helperText={formik.errors.num}
        required
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#FF7332",
          margin: "20px",
          "&:hover": {
            backgroundColor: "#FF8F5B",
          },
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserNameForm;
