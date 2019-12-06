import Vue from 'vue';

import LangSwitcher from '~/components/layout/LangSwitcher'
import Avatar from '~/components/users/Avatar'

Vue.component('lang-switcher', LangSwitcher);
Vue.component("avatar", Avatar);


import { Message, MessageBox } from 'element-ui'

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;


import {Switch, DatePicker, TimePicker, TimeSelect} from 'element-ui';
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(TimeSelect);

import moment from 'moment-timezone';
Vue.prototype.$moment = moment;
