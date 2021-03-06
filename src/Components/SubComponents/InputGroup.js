import React from "react";
import styled from "styled-components";

const FormLabel = styled.label`
   font-size: 0.7em;
   margin-bottom: 0.25em;
   color: #222;
   font-weight: lighter;
`;

const FormInput = styled.input`
   padding: 10px 10px;
   border-radius: 120px;
   outline: none;
   border: 1px solid #cfcfcf;
   display: flex;
   margin: auto;

   &[placeholder] {
      font-size: 1.2em;
      font-weight: lighter;
      color: #999;
   }
`;

export default function InputGroup({
   name,
   type,
   placeholder,
   handleChange,
   formError,
   className,
   label,
   value,
   formDisabled,
}) {
   return (
      <div className={className}>
         <FormLabel htmlFor={name}>{label}</FormLabel>
         <FormInput
            className="form-control"
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleChange}
            style={
               formError
                  ? {
                       border: "1px solid red",
                       boxShadow: "0 0 2px red",
                    }
                  : null
            }
            disabled={formDisabled}
            value={value}
         />
         <span className="errorMessage">{formError}</span>
      </div>
   );
}
