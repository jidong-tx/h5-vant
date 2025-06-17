/**
 * 根据HTTP状态码获取对应的消息信息
 *
 * @param status HTTP状态码，可以是字符串或数字
 * @returns 返回对应状态码的消息信息
 */
export const getMessageInfo = (status: string | number) => {
	let msg = "";
	switch (status) {
		case 400:
			msg = "请求失败(400)";
			break;
		case 401:
			msg = "未授权(401)";
			break;
		case 403:
			msg = "拒绝访问(403)";
			break;
		case 404:
			msg = "请求地址错误(404)";
			break;
		case 500:
			msg = "服务器内部错误(500)";
			break;
		default:
			msg = `连接出错(${status})!`;
			break;
	}
	return msg;
};
