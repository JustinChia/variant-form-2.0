<template>
	<div class="setting-grid-dialog">
		<Button type="primary" @click="showDialog">{{i18nt('designer.setting.edit')}}</Button>
		<Modal class-name="ivu-setting-grid-modal" v-model="isShowDialog"
			:title="i18nt('designer.setting.editGridData')" @on-ok="ok" @on-cancel="cancel">
			<ul class="ul-title">
				<li>
					<div class="col" v-for="(col, idx) in field.columns" :key="idx">{{col.label}}</div>
				</li>
			</ul>
			<draggable tag="ul" :list="settingValue"
				v-bind="{group:'optionsGroup', ghostClass: 'ghost', handle: '.drag-option'}">
				<li v-for="(option, idx) in settingValue" :key="idx">
					<Checkbox :label="option.checked">
						<Input class="col" v-model="option[col.value]" v-for="(col, idxCol) in field.columns"
							:key="idxCol" placeholder="Value" size="small" style="width: 100px"></Input>
						<i class="iconfont icon-drag drag-option"></i>
						<Button shape="circle" size="small" type="warning" @click="deleteOption(option, idx)"
							icon="md-remove" class="col-delete-button">
						</Button>
					</Checkbox>
				</li>
			</draggable>

			<Button type="text" @click="addRow">{{i18nt('designer.setting.addOption')}}</Button>
			<Button type="text" @click="resetDefault">{{i18nt('designer.setting.resetDefault')}}</Button>
		</Modal>
	</div>
</template>

<script>
	import Draggable from 'vuedraggable'
	import i18n from "../../../utils/i18n";
	export default {
		name: "SettingGrid",
		mixins: [i18n],
		components: {
			Draggable
		},
		props: {
			field: Object,
			default: {
				type: [Array]
			},
			value: {
				type: [Array]
			}
		},
		data() {
			return {
				isShowDialog: false,
				gridData: "",
			}
		},
		computed: {
			settingValue: {
				get: function() {
					this.gridData = this.value || this.default;
					return this.gridData;
				}
			}
		},
		methods: {
			ok() {
				this.$emit('input', this.gridData);
				this.isShowDialog = false;
			},
			cancel() {
				this.isShowDialog = false;
			},
			showDialog() {
				this.isShowDialog = true;
			},
			deleteOption(idx) {
				this.gridData.splice(idx, 1)
			},
			addRow() {
				let row = {};
				for (let i = 0; i < this.field.columns.length; i++) {
					row[this.field.columns[i].value] = "";
				}
				console.log(row);
				this.gridData.push(row);
			},
			resetDefault() {
				this.gridData.splice(0, this.gridData.length);
				for (let row in this.default) {
					this.gridData.push(row);
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.ivu-setting-grid-modal {
		.ul-title {
			padding-left: 20px;
			padding-right: 40px;
		}

		li {
			display: flex;
			width: 100%;
			list-style: none;
			height: 30px;
			align-items: center;

			.col {
				flex-grow: 1;
				flex-shrink: 0;
			}

			.iconfont.drag-option {
				height: 25px;
				line-height: 25px;

			}
		}

		.ivu-checkbox-wrapper {
			width: 100%;
			display: flex;
			align-items: center;

			::v-deep .ivu-checkbox {
				display: inline-block;
				width: 18px;
				flex-shrink: 0;
			}
		}

	}

	.drag-option {
		cursor: move;
	}
</style>
