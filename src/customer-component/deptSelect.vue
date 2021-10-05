<template>
	<Input type="text" :size="size" :placeholder="placeholder" :disabled="disabled" v-model="value">
		<Button slot="append" @click="show">{{text}}</Button>
	</Input>
</template>

<script>
	export default{
		name:"deptSelect",
		data(){
			return {
				value:""
			}
		},
		props:{
			size:String,
			placeholder:String,
			text:{
				type:String,
				default:"选择"
			},
			disabled:false,
			
		},
		methods:{
			show(){
				this.$Message.info('Clicked ok');
			}
		}
	}
</script>

<style>
</style>
