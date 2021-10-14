<template>
	<Select v-bind="field.props" v-model="settingValue">
	    <Option v-for="item in field.child" :value="item.value" :key="item.value">{{ i18nt(item.label) }}</Option>
	</Select>
</template>

<script>
	import i18n from "../../../utils/i18n";
	export default{
		name:"SettingSelect",
		mixins: [i18n],
		props:{
			field:Object,
			default:{
				type:[String]
			},
			value:{
				type:[String,Number,Array],
				default:'',
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
