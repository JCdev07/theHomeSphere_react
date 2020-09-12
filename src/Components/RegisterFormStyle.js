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
         background-color: #519e8a;
         color: #fff;
         border: 2px solid #fff;
         width: 100%;
         margin-top: 1em;
         padding: 8px 0px;
         font-size: 1em;
         font-weight: lighter;
         letter-spacing: 1px;
         margin-bottom: 0.25em;
         transition: all 0.3s ease;

         &:hover {
            color: #519e8a;
            background-color: #fff;
            border: 2px solid #519e8a;
         }

         &:disabled,
         &[disabled] {
            border: 1px solid #8ebaaf;
            background-color: #8ebaaf;
            color: #666666;
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
`;

export const FormWrapper = styled.div`
   max-width: 90vw;
   display: flex;
   flex-direction: column;
   padding: 20px 40px;
   border-radius: 10px;
   box-shadow: 0px 10px 50px #555;
   background-color: #ffffff;

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
