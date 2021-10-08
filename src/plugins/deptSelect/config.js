let plugin = {
 	"type": "deptSelect",
 	"icon": "iconfont icon-dingdangenzong",
 	"plugin": true,
 	"formItemFlag": true,
 	"options": {
 		"name": "",
 		"label": "",
 		"size": "",
 		"value": {},
 		"placeholder": "designer.control.placeholder",
 		"disabled": false,
 		"selectBtnText": "designer.control.selectBtnText",
 		"formName": "ZhaoBiaoXiangMu",
 		"displayField": "XiangMuMingChen",
 		"selectFields": "_id,XiangMuMingChen"
 	},
 	"setting": {
 		"commonSetting": [{
 				"name": "selectBtnText",
 				"displayName": "setting.deptSelect.selectBtnText",
 				"field": {
 					"type": "Input",
 					"props": {
 						"type": "text",
 						"maxlength": 6,
 						"clearable": true
 					}
 				}
 			} 			
 		],
 		"advancedSetting": [],
 		"eventSetting": [{
			displayName:"setting.selectBtnText",
			tooltip:"setting.selectBtnText",
			eventName:"onsave",
			eventParam:"arg1,arg2"
		}]
 	},
 	"i18n": {
 		"zh-CN": {
 			"designer": {
 				"widgetLabel": {
 					"projectSelect": "项目选择"
 				},
 				"control": {
 					"dialogTitle": "请选择",
 					"dialogClose": "关闭",
 					"placeholder": "请选择",
 					"selectBtnText": "请选择"
 				}
 			},
 			"setting": {
 				"projectSelect": {
 					"selectBtnText": "选择按钮名称",
 					"formName": "表单名称",
 					"displayField": "显示字段",
 					"selectFields": "使用字段"
 				}
 			}
 		},
 		"en-US": {
 			"designer": {
 				"widgetLabel": {
 					"projectSelect": "Select Project"
 				},
 				"control": {
 					"dialogTitle": "Please Select",
 					"dialogClose": "Close",
 					"placeholder": "Select",
 					"selectBtnText": "Select"
 				}
 			},
 			"setting": {
 				"projectSelect": {
 					"selectBtnText": "Select Button Name",
 					"formName": "Form Name",
 					"displayField": "Display Field",
 					"selectFields": "Useful Fields"
 				}
 			}
 		}
 	}
 }

 export default plugin;
