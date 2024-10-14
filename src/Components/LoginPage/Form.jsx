import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, userImageUpload, handleChange, loginUser } from '../../redux-toolkit/auth';
import Dropzone from 'react-dropzone';
import FlexBetween from "../widget/FlexBetweeen";



// register schema
const registerSchema = yup.object().shape({
  firstName : yup.string().required("required"),
  lastName : yup.string().required("required"),
  email : yup.string().email("invalid email").required("required"),
  password : yup.string().required("required"),
  location : yup.string().required("required"),
  occupation : yup.string().required("required"),
  picture : yup.string().required("required"),
});


const loginSchema = yup.object().shape({
  email : yup.string().email("Invalid email").required("required"),
  password : yup.string().required("required")
});


const initialValuesOfRegister = {
  firstName : "",
  lastName : "",
  email : "",
  password : "",
  location : "",
  occupation : "",
  picture : ""
};

const initalValuesOfLogin = {
  email : "",
  password : ""
};



const Form = () => {
  const [pageType, setPageType] = useState("register");
  const dispatch = useDispatch();
  
  const [file, setFile] = useState();
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const {user, dp, firstName, lastName,  email, password, location, occupation} = useSelector((store) => store.auth);
  if(user){
    setTimeout(() => {
      navigate("/")
    }, 3000);
  }
  // console.log(file);
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}))
  
  };
  const handleImage = (e) => {
    // const files = Array.from(e.target.files);
        console.log(e.target.files[0]);
        setFile(e.target.files[0])
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    // console.log(formData);
    dispatch(userImageUpload(formData))
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("form submit");
    // values.preventDefault();
    if (isRegister) await dispatch(registerUser({
      firstName : firstName,
      lastName : lastName,
      email : email,
      location : location,
      occupation : occupation,
      password : password,
      picture : dp
    }));
    if(isLogin) await dispatch(loginUser({
      email : email,
      password : password
    }))
  };
  
  return (
    <Formik
    initialValues={isLogin ? initalValuesOfLogin : initialValuesOfRegister}
    validationSchema={isLogin ? loginSchema : registerSchema}
    onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleFormSubmit}>
          <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div" : { gridColumn : isNonMobile ? undefined : "span 4"},
          }}
          >
            {isRegister && (
              <>
              <TextField 
              label="First Name"
              onBlur={handleBlur}
              onChange={handleInput}
              value={firstName}
              name='firstName'
              error={
                Boolean(touched.firstName) && Boolean(errors.firstName)
              }
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn : "span 2"}}
              />
              <TextField 
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleInput}
              value={lastName}
              name='lastName'
              error={
                Boolean(touched.lastName) && Boolean(errors.lastName)
              }
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn : "span 2"}}
              />

<Box
              gridColumn="span 4"
              border={`1px solid ${theme.palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
              >
                <Dropzone
                acceptedFiles=".jpg, .jpeg, .png"
                multiple={false}
                onDrop={(acceptedFiles) => 
                setFieldValue("picture", acceptedFiles[0])
                }
                >
                  {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                       <input 
                    className='file-input' 
                    onChange={handleImage} 
                    type="file" 
                    name="img" 
                    id="file-input" 
                    placeholder='choose file' 
                    multiple={false}
                    // onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    />

                        {!file ? (
                          <p></p>
                        ) : (
                          <FlexBetween>
                            <Typography></Typography>
                            {/* <EditOutlinedIcon /> */}
                          </FlexBetween>
                        )}
                        
                      </Box>
                    )}
                </Dropzone>
              </Box>

              <TextField 
              label="location"
              onBlur={handleBlur}
              onChange={handleInput}
              value={location}
              name='location'
              error={
                Boolean(touched.location) && Boolean(errors.location)
              }
              helperText={touched.location && errors.location}
              sx={{ gridColumn : "span 4"}}
              />

<TextField 
              label="Occupation"
              onBlur={handleBlur}
              onChange={handleInput}
              value={occupation}
              name='occupation'
              error={
                Boolean(touched.occupation) && Boolean(errors.occupation)
              }
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn : "span 4"}}
              />
              
              </>
            )}

<TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleInput}
              value={email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleInput}
              value={password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          


           {/* BUTTONS */}
           <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>

        </form>
      )}

    </Formik>
  )
}

export default Form