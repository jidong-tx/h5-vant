export default {
	plugins: {
		"postcss-px-to-viewport-8-plugin": {
			unitToConvert: "px", // 要转化的单位
			// viewportWidth: 750, // UI设计稿的宽度
			viewportWidth: (file) => {
				let num = 750;
				//van是375
				if (file.indexOf("/vant") > 0) {
					num = 375;
				}
				return num;
			},
			unitPrecision: 6, // 转换后的精度，即小数点位数
			propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
			// selectorBlackList: [/^\.van/, /^\.ignore/], // 指定不转换为视窗单位的类名，
			viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
			fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw      selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
			minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
			mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
			replace: true, // 是否转换后直接更换属性值
			// exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
		},
	},
};
