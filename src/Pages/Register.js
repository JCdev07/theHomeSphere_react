import React from "react";
import styled from "styled-components";
import RegisterForm from "./../components/RegisterForm";

const RegisterCont = styled.div`
   background-image: url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
`;

const Register = () => {
   return (
      <RegisterCont>
         <RegisterForm />
      </RegisterCont>
   );
};

export default Register;
