<template>
	<RadioGroup v-bind="field.props" v-model="settingValue">
		<Radio v-for="item in field.child" :key="item.value" :label="item.value">{{i18nt(item.label)}}</Radio>
	</RadioGroup>
</template>

<script>
	import i18n from "../../../utils/i18n";
	export default{
		name:"SettingRadioGroup",
		mixins: [i18n],
		props:{
			field:Object,
			default:{
				type:[String,Number,Object]
			},
			value:{
				type:[String,Number,Object]
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
