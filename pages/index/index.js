
const { request, api, filterHtml, addCommas } = require('../../utils/util.js');

var app = getApp()
Page({
  data: {
    shots: [],
    pageIndex: 1,
    isShowLoading: true,
    actionSheetHidden: true,

    activeMenu:{
      sort: 'Popular',
      list: 'Shots',
      timeframe: 'Now',
    },
    activeMenuValue: {
      list: '',
      timeframe: '',
      sort: ''
    },
    activeMenuText: '',
    menu: {
      list:['Debuts', 'Team Shots', 'Playoffs', 'Rebounds', 'Animated GIFs', 'Shots with Attachments'],
      listValue: ['debuts', 'teams', 'playoffs', 'rebounds', 'animated', 'attachments'],

      timeframe: ['Now', 'This Past Month', 'This Past Year', 'All Time'],
      timeframeValue: ['now', 'month', 'year', 'ever'],

      sort: ['Recent','Most Viewed','Most Commented'],
      sortValue: ['recent', 'views', 'comment'],

    },

    windowHeight: '',
  },


  /*------------------ methods  -----------------*/
  
  changeSort: function(e) {
    let { name, index, value } = e.currentTarget.dataset;
    let { activeMenuValue, activeMenu, menu } = this.data;

    let obj = {
      activeMenuValue,
      activeMenu
    };

    obj['actionSheetHidden'] = !this.data.actionSheetHidden;
    obj['activeMenu'][name] = value;
    obj['activeMenuValue'][name] = menu[name + 'Value'][index];

    obj['shots'] = [];  // 清空
    obj['pageIndex'] = 1; // 分页重置
    
    // set data
    this.setData(obj);

    // request
    this.getShots(this.data.activeMenuValue)
    
  },
  actionSheetChange: function(e){
    let datas = {};
    let { name } = e.currentTarget.dataset;
    let { actionSheetHidden } = this.data;

    datas['actionSheetHidden'] = !actionSheetHidden;
    if (name){
      datas['activeMenuText'] = name;  
    }
    this.setData(datas);
  },

  /**
   * 获取数据
   * @param  {Object}   params
   * @return
   */
  getShots: function(params = {}) {
  
    let pageIndex = params.page || 1;

    // show loading
    this.setData({
      isShowLoading: true
    });

    let defaultParams = {
      page: pageIndex,
      per_page: 30
    };

    Object.assign(defaultParams, this.data.activeMenuValue, params);

    // send
    request({
      url: api.getShots,
      data: defaultParams
    }).then(res => {
      let datas = [];

      for (d of res.data) {
        d.description = filterHtml(d.description);
        d.views_count = addCommas(d.views_count);
        d.likes_count = addCommas(d.likes_count);
        datas.push(d);
      }

      this.setData({
        pageIndex,
        shots: this.data.shots.concat(datas),
        isShowLoading: false
      })

    })
  },
  loadMore: function(e){
    this.getShots({
      page: ++this.data.pageIndex
    });
  },
  onLoad: function () {
    this.getShots();
    wx.getSystemInfo({
      success: res => {
        this.setData({
          windowHeight: res.windowHeight
        })
      }
    });
  },
  // 下拉刷新
  onPullDownRefreash: function() {
    this.setData({
      shots: []
    });
    this.getShots();
  }
})
