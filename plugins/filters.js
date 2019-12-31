import Vue from 'vue'
import moment from 'moment'

Vue.filter('diffForHumans', function (value) {
    let date = moment(value);
    return date.fromNow();
})

Vue.filter('compact', function (value) {

    let date = moment(value);
    let today = moment();

    if(date.isAfter(today.startOf('day'))){
        return date.format('HH:MM')
    }

    return date.format('DD MMM');
})

Vue.filter('diffForHumans', function (value) {

    let date = moment(value);
    return date.fromNow();
})

Vue.filter('humanDuration', function (value) {

    let hours = Math.floor(parseInt(value, 10) / 60);
    let minutes = parseInt(value, 10) % 60;
    return `${hours}h` + (minutes != 0 ? minutes : '');
})


Vue.filter('date_i18n', function (value) {

    let date = moment(value);
    let today = moment();

    return date.format('ll LT');
})


Vue.filter('date', function (value, format) {

    let date = moment(value);

    return date.format(format);
})
