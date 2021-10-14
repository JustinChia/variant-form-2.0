<template>
	<CheckboxGroup v-bind="field.props" v-model="settingValue">
		<Checkbox v-for="item in field.child" v-bind="item.props" :key="item.value" :label="item.value">{{i18nt(item.label)}}</Checkbox>
	</CheckboxGroup>
</template>

<script>
	import i18n from "../../../utils/i18n";
	export default{
		name:"SettingCheckGroup",
		mixins: [i18n],
		props:{
			field:Object,
			default:{
				type:[Array]
			},
			value:{
				type:[Array]
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
