import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';

const getTomorrow = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 1));
};

const getDayAfterTomorrow = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 2));
};
const CalendarComponent = () => {
    const [state, setState] = useState([
        {
            startDate: getTomorrow(),
            endDate: getDayAfterTomorrow(),
            key: 'selection',
        },
    ]);
    const handleSelect = (ranges) => {
        if (ranges.selection && ranges.selection.startDate && ranges.selection.endDate) {
            setState([ranges.selection]);
        }
    };

    return (
            <DateRangePicker
                ranges={state}
                onChange={handleSelect}
                months={1}
                direction="vertical"
                showMonthAndYearPickers={false}
                rangeColors={['#3182ce']}
            />
    );
};

export default CalendarComponent