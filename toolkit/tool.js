//timestamp 时间戳,返回yyyy-MM-dd HH:mm:ss格式
export function toDateTimeString(timestamp) {
	if (timestamp === null || timestamp === "" || timestamp == 0)
		return '';
	if (typeof(timestamp) === "string")
		timestamp = parseInt(timestamp)

	const date = new Date(timestamp);
	const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
	const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
	const second = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
	return `${date.toJSON().substring(0, 10)} ${hour}:${minute}:${second}`
	//return `${date.toJSON().substring(0, 10)} ${hour}:${minute}`
}
