import SettingSelect from './SettingSelect';
import SettingInput from './SettingInput';
import SettingCheckbox from './SettingCheckbox';
import SettingCheckGroup from './SettingCheckGroup';
import SettingRadioGroup from './SettingRadioGroup';
import SettingGrid from './SettingGrid';


const components=[
	SettingSelect,
	SettingInput,
	SettingCheckbox,
	SettingCheckGroup,
	SettingRadioGroup,
	SettingGrid
]
const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

}

if (typeof window !== 'undefined' && window.Vue) { /* script方式引入时主动调用install方法！！ */
  window.axios = axios
  install(window.Vue);
}

export default {
	install
};