import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { changePasswordSchema } from "@/src/utils/formSchema";
import AuthService from "@/src/services/auth/authServices";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        password: "",
        password_confirmation: "",
      }}
      validationSchema={changePasswordSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched }) => (
        <Form
          style={{ minWidth: "23rem", background: "rgb(255, 255, 255)" }}
          className="p-3 border border-light rounded shadow-sm"
        >
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Field
                className={
                  errors.password && touched.password
                    ? `form-control is-invalid`
                    : `form-control`
                }
                type={isShowPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                validateOnBlur
                validateOnChange={false}
              />
              {!!values.password ? (
                <button
                  className="border-0"
                  style={{
                    background: "transparent",
                    position: "absolute",
                    right: errors.password && touched.password ? "10%" : "4%",
                    top: 0,
                    padding: "5px",
                    color: "#1d1d1e",
                    transition: ".3s",
                  }}
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              ) : (
                ""
              )}

              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <Field
              className={
                errors.password_confirmation && touched.password_confirmation
                  ? `form-control is-invalid`
                  : `form-control`
              }
              type={isShowPassword ? "text" : "password"}
              name="password_confirmation"
              id="confirmPassword"
              placeholder="Confirm Password"
              validateOnBlur
              validateOnChange={false}
            />
            {errors.password_confirmation && touched.password_confirmation ? (
              <div className="invalid-feedback">
                {errors.password_confirmation}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3 d-flex align-items-center flex-column">
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", height: "45px" }}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
