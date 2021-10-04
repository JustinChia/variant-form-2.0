<template>
	<Checkbox v-bind="field.props" v-model="settingValue">{{i18nt(field.props.label)}}</Checkbox>
</template>

<script>
	import i18n from "../../../utils/i18n";
	export default{
		name:"SettingCheckbox",
		mixins: [i18n],
		props:{
			field:Object,
			default:{
				type:[String,Boolean],
				default:false,
			},
			value:{
				type:[String,Boolean]
			}
		},
		computed:{
			settingValue:{
				get:function(){
					return this.value||this.default;
				},
				set:function(val){
					this.$emit('input',val);
				}
			}
		}
	}
</script>

<style>
</style>
