import React from "react";
import { RangeDatePicker } from "react-google-flight-datepicker";
import "react-google-flight-datepicker/dist/main.css";

export default function DatePicker() {
   return (
      <>
         <RangeDatePicker
            startDate={new Date(2020, 0, 15)}
            endDate={new Date(2020, 1, 1)}
            startDatePlaceholder="From"
            endDatePlaceholder="To"
            highlightToday
         />
      </>
   );
}
