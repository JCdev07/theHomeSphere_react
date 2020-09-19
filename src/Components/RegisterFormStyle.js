import styled from "styled-components";

export const Form = styled.form`
   width: 100%;
   display: flex;
   flex-wrap: wrap;

   & .firstname,
   .lastname,
   .email,
   .password {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
   }

   & .firstname {
      @media (min-width: 576px) {
         margin-right: 1%;
         width: 49%;
      }
   }

   & .lastname {
      @media (min-width: 576px) {
         margin-right: 1%;
         width: 49%;
      }
   }

   & .createAccount {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      & button {
         background-color: #330066;
         color: #fff;
         border: 2px solid #fff;
         font-weight: 600;
         width: 100%;
         margin-top: 1em;
         padding: 8px 0px;
         font-size: 1em;
         font-weight: lighter;
         letter-spacing: 1px;
         margin-bottom: 0.25em;
         transition: all 0.3s ease;
         border-radius: 120px;

         &:hover {
            color: #330066;
            background-color: #fff;
            border: 2px solid #330066;
         }

         &:disabled,
         &[disabled] {
            border: 1px solid #7851a9;
            background-color: #7851a9;
         }
      }

      & small {
         color: #999;
         font-weight: lighter;
      }
   }

   & .errorMessage {
      color: red;
      font-size: 0.75em;
      display: relative;
   }
`;

export const Wrapper = styled.div`
   height: 100vh;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
      url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
   background-size: cover;
   background-position: center;
`;

export const FormWrapper = styled.div`
   max-width: 90vw;
   display: flex;
   flex-direction: column;
   padding: 20px 40px;
   border-radius: 10px;
   box-shadow: 0px 10px 50px #555;
   background-color: #f8f8ff;

   @media (min-width: 576px) {
      max-width: 490px;
   }
`;

export const FormHeader = styled.h1`
   text-align: center;
   width: 100%;
   color: #111;
   font-weight: lighter;
   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
