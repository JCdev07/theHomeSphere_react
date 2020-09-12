import React, { useState } from "react";
import { Wrapper, FormWrapper, Form, FormHeader } from "./RegisterFormStyle";
import InputGroup from "./SubComponents/InputGroup";
import { Link } from "react-router-dom";

export default function RegisterForm() {
   return (
      <>
         <Wrapper>
            <div className="row">
               <FormWrapper>
                  <div id="my-signin2"></div>
                  <FormHeader>Log in to your account</FormHeader>
                  <Form noValidate>
                     {/* Email */}
                     <InputGroup
                        className="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        // handleChange={handleChange}
                        // formError={formErrors.email}
                     />

                     {/* Password */}
                     <InputGroup
                        className="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        // handleChange={handleChange}
                        // formError={formErrors.password}
                     />

                     {/* CTA */}
                     <div className="createAccount">
                        <button
                           type="submit"
                           id="form-btn"
                           // disabled={!formValid}
                        >
                           Submit
                        </button>
                        <small>
                           Dont have an account?{" "}
                           <Link to="/register">Sign up</Link>
                        </small>
                     </div>
                  </Form>
               </FormWrapper>
            </div>
         </Wrapper>
      </>
   );
}
