<template>
	<Input type="text" v-bind="field.props" v-model="settingValue">
		<span slot="prepend" v-if="field.prependText">{{field.prependText}}</span>
		<span slot="append" v-if="field.appendText">{{field.appendText}}</span>
	</Input>
</template>

<script>
	export default{
		name:"SettingInput",
		props:{
			type:String,
			field:Object,
			default:{
				type:[String,Number,Boolean,Object]
			},
			value:{
				type:[String,Number,Boolean,Object],
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
