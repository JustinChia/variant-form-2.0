<template>
	<Input type="text" :size="size" :placeholder="placeholder">
		<Button slot="append" @click="show">选择</Button>
	</Input>
</template>

<script>
	export default{
		name:"deptSelect",
		data(){
			return {}
		},
		props:{
			size:String,
			placeholder:String
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
