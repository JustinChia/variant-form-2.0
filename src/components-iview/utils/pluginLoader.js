import i18n from "@/components-iview/utils/i18n";

export default {
	setI18nResource:function(i18nRes){
		i18n.methods.appendResource('zh-CN', i18nRes["zh-CN"]);
	}
}