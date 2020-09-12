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
                  <FormHeader>Create Account</FormHeader>
                  <Form noValidate>
                     {/* Firstname */}
                     <InputGroup
                        className="firstname"
                        name="firstname"
                        type="text"
                        placeholder="Firstname"
                        // handleChange={handleChange}
                        // formError={formErrors.firstname}
                     />

                     {/* Lastname */}
                     <InputGroup
                        className="lastname"
                        name="lastname"
                        type="text"
                        placeholder="Lastname"
                        // handleChange={handleChange}
                        // formError={formErrors.lastname}
                     />

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

                     {/* Confirm Password */}
                     <InputGroup
                        className="password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        // handleChange={handleChange}
                        // formError={formErrors.confirmPassword}
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
                           Already Have an Accont?{" "}
                           <Link to="/login">Log in</Link>
                        </small>
                     </div>
                  </Form>
               </FormWrapper>
            </div>
         </Wrapper>
      </>
   );
}
