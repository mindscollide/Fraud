import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const token = JSON.parse(localStorage.getItem("token"));
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    let FormData = setupForms.routingData.response;
    if (FormData !== undefined && FormData !== null) {
      let count = FormData.length;
      let a = [];
      FormData.map((data) => {
        for (let i = 0; i < count; i++) {
          if ("/Fraud/" + data.path === location.pathname) {
            setFlag(true);
            a.push(true);
          } else {
            a.push(false);
          }
        }
      });

      const found = a.find((element) => element === true);
      if (found === true) {
        setFlag(true);
      } else {
        setFlag(false);
      }
    }
  }, [location, setupForms]);

  if (!token) {
    // Not "/404" — an unauthenticated user should land on Login. This also
    // matters for sign-out specifically: signOut() (auth-actions.js) clears
    // localStorage right after calling Helper.navigate("/"), and the SIGN_OUT
    // action resets the whole Redux store. If PrivateRoute is still mounted
    // (you were on a /Fraud/... page) when that store reset re-renders it,
    // token reads back as null here before the route match has actually
    // swapped away from /Fraud/* — sending it to "/" instead of "/404" means
    // both navigations converge on the same destination either way.
    return <Navigate to="/" replace />;
  }
  if (!flag) {
    return <Navigate to="/404" replace />;
  }
  return children;
};
export default PrivateRoute;
