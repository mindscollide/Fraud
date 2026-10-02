import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { setRoutingData } from "../store/actions/setup-forms-actions";
import { useDispatch } from "react-redux";
const CustomRoutes = ({ RoutingData }) => {
  const dispatch = useDispatch();
  const allowedTransactionTypes = JSON.parse(
    localStorage.getItem("allowedTransactionTypes")
  );
  useEffect(() => {
    let tem2 = [];

    if (RoutingData && allowedTransactionTypes.length > 0) {
      allowedTransactionTypes.map((data, i) => {
        RoutingData.map((item, index) => {
          if (item.ttid === data) {
            tem2.push(item);
          } else if (item.ttid === 12) {
            tem2.push(item);
          }
        });
      });

      dispatch(setRoutingData(tem2));
    }
  }, [RoutingData]);
  const IndexComponent = RoutingData ? RoutingData[0].component : null;
  return (
    <Routes>
      {RoutingData ? (
        <>
          <Route index element={<IndexComponent />} />
          {RoutingData.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<item.component />}
            />
          ))}
        </>
      ) : null}
    </Routes>
  );
};
export default CustomRoutes;
