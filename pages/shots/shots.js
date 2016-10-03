
var app = getApp();

Page({
    data: {
        shot: {}
    },

    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.shot.title || 'Dribbble'
        });
        
    },
    onLoad: function(options) {
        this.setData({
            shot: options
        })
        console.log('[shots]: ', options)
    }
})