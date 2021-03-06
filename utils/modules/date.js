export default {
	format(timestamp) {
		if (timestamp === null || timestamp === "" || timestamp == 0) return '';
		if (typeof(timestamp) === "string") timestamp = parseInt(timestamp)

		const date = new Date(timestamp);
		const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
		const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
		const second = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
		return `${date.toJSON().substring(0, 10)} ${hour}:${minute}:${second}`
		//return `${date.toJSON().substring(0, 10)} ${hour}:${minute}`
	},
	currentDate() {
		const date = new Date()
		let y = date.getFullYear()
		let mS = date.getMonth() + 1
		let m = mS >= 10 ? mS : `0${mS}`
		let d = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
		return `${y}-${m}-${d}`
	}
}
