// import React from "react";
// import { Steps, Button, message, Space } from "antd";
// import StepOne from "../../Pages/AddScheduleForm/step-one";
// import StepTwo from "../../Pages/AddScheduleForm/step-two";
// import CustomButton from "../Button/button";

// const steps = [
//   {
//     title: "one",
//     content: <StepOne />,
//   },
//   {
//     title: "two",
//     content: <StepTwo />,
//   },
// ];

// const MultiStep = ({ headerTitle, data }) => {
//   const [current, setCurrent] = React.useState(0);

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   return (
//     <>
    
//       <div className="steps-content">{steps[current].content}</div>
//       <div className="steps-action u-text-align-center">
//       <div className="u-margin-top-15pct"/>
//         {current < steps.length - 1 && (
//           <CustomButton
//             click={() => next()}
//             text="Next"
//             endIcon={<i className="icon-arrow-right icon-size-one"></i>}
//             applyClass="btnBorderStyled"
//           />
//         )}
//         <Space size={12}>
//           {current > 0 && (
//             <CustomButton
//               click={() => prev()}
//               text="Previous"
//               icon={<i className="icon-arrow-left icon-size-one"></i>}
//               applyClass="btnBorderStyledAnimated"
//             />
//           )}
//           {current === steps.length - 1 && (
//             <CustomButton
//               click={() => message.success("Processing complete!")}
//               text="Finish"
//               applyClass="btnBorderStyled"
//             />
//           )}
//         </Space>
//       </div>
//     </>
//   );
// };

// export default MultiStep;
