const { request, api, filterHtml, dateFormat, addCommas } = require('../../utils/util.js');

let app = getApp();

Page({
	data: {
		user: {},
		shots: [],
		page: 1
	},
	onReady() {

	},
	onLoad(options) {
		console.log(options);
		this.setData({
			user: options
		});

		this.getUserProfile(options.user_name)
		this.getUserShots(options.user_id);
	},
	/* 
	 * 获取用户信息
	 *
	 * @param  {number} user_name  用户名
	*/
	getUserProfile(user_name){
		request({
			url: api.getUserProfile(user_name)
		})
		.then(res => {
			console.log('[get user profile]: ', res.data);
			this.setData({
				user: res.data
			})
		})
	},
	/* 
	 * 获取用户的 shots
	 *
	 * @param  {number} user_id   用户id
	 * @param  {number} page      页码
	*/
	getUserShots(user_id, page = 1) {
		request({
			url: api.getDesignerShots,
			data: {
				user_id,
				page
			}
		})
		.then(res => {
			console.log('[get designer shots]: ', res.data)

			let data = res.data && res.data[0];
			// shots
			let obj = {
				shots: this.data.shots.concat(data.shots || []),
				page: page + 1,
			};

			this.setData(obj);
		})
	},
})