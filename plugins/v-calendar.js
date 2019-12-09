import Vue from 'vue'
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
    navVisibility : 'hidden',
    themeStyles : {
        wrapper: { backgroundColor: '#ffffff', border: '0' },
        dayCellNotInMonth: { opacity: 0.4 },
        dayPopoverContent: {
            color: '#333333',
            fontSize: '.8rem',
            whiteSpace: 'nowrap',
        },
        header:false,
    },
    datePickerDisabledAttribute: {
        contentStyle: ({ isHovered }) => ({
            color: '#CCC',
            fontWeight: 600,
            opacity: 0.6,
            borderRadius: '0',
            ...(isHovered && {
            cursor: 'not-allowed',
            backgroundColor: 'transparent',
            }),
        }),
        },
});