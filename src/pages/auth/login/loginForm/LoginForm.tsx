import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { BiError } from "react-icons/bi";
import { toast } from "react-toastify";

import { loginSchema } from "@/src/utils/formSchema";
import AuthService from "@/src/services/auth/authServices";
import checkCircle from "@/src/assets/check-circle.png";
import { MoonLoader } from "react-spinners";

const AuthServices = new AuthService();

export default function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleSubmit = async (data: object) => {
    setIsSignIn(true);
    const login = await AuthServices.login(data);
    if (login.status < 400) {
      localStorage.setItem("user-token", login.data.data.token);
      toast.success("Sign in successfully.", {
        icon: () => <img src={checkCircle} alt="" />,
        style: { background: "#D9F3EE", color: "#12A594", fontSize: "13px" },
        hideProgressBar: true,
      });
      navigate("/employee");
    } else {
      toast.error(
        "Incorrect Username, Password or Factory. Please try again!",
        {
          icon: () => <BiError size={20} />,
          style: {
            background: "#FFEFEF",
            color: "#E5484D",
            fontSize: "13px",
          },
          hideProgressBar: true,
        }
      );
      setIsSignIn(false);
      return;
    }
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        company_id: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched }) => (
        <Form
          style={{ minWidth: "22rem", background: "rgb(255, 255, 255)" }}
          className="p-3 border border-light rounded shadow-sm"
        >
          <div className="">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <Field
              className={
                errors.username && touched.username
                  ? `form-control is-invalid`
                  : `form-control`
              }
              name="username"
              id="username"
              type="text"
              placeholder="User Name"
              validateOnBlur
              validateOnChange={false}
            />
            {errors.username && touched.username ? (
              <div className="invalid-feedback">{errors.username}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Field
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="password"
                id="password"
                type={isShowPassword ? "text" : "password"}
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
          <div className="mt-3 pb-3">
            <label htmlFor="factory" className="form-label">
              Factory
            </label>
            <Field
              className={
                errors.company_id && touched.company_id
                  ? `form-select is-invalid`
                  : `form-select`
              }
              id="factory"
              as="select"
              name="company_id"
              placeholder="Select Factory"
              aria-label="Select Factory"
            >
              <option>Select Factory</option>
              <option value="1">SBM</option>
              <option value="2">DMF</option>
            </Field>
            {errors.company_id && touched.company_id ? (
              <div className="invalid-feedback">{errors.company_id}</div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-3 d-flex align-items-center flex-column">
            <Button
              className="d-flex justify-content-center align-items-center"
              variant="primary"
              type={isSignIn ? "button" : "submit"}
              style={{
                width: "100%",
                height: "48px",
                cursor: isSignIn ? "no-drop" : "pointer",
              }}
            >
              {isSignIn ? <MoonLoader color="#FBFDFF" size={20} /> : "Sign In"}
            </Button>

            <Link className="mt-3" to={"/auth/forgot-password"}>
              Forgot Your Password ?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}