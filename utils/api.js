const HOST = "https://api.dribbble.com/v1/"; 

module.exports = {
    getShots: HOST + 'shots',
    getShotAttachments: function(id) {
        return HOST + 'shots/' + id + '/attachments';
    },
    getShotComments: function(id) {
        return HOST + 'shots/' + id + '/comments';
    },
    getShotCommentLikes: function(shot_id, comment_id) {
        return HOST + 'shots/' + shot_id + '/comments/' + comment_id + '/likes';
    },
    getShotRebounds: function(shot_id) {
        return HOST + 'shots/' + shot_id + '/rebounds';
    },
    getShotProjects: function(shot_id) {
        return HOST + 'shots/' + shot_id + '/projects';
    },
    createComment: function(id) {
        return HOST + 'shots/' +id + '/comments';
    },
    // post / delete
    createLikeComment: function(shot_id, comment_id) {
        return HOST + 'shots/' + shot_id + '/comments/' + comment_id + '/like';
    },
    getUserShots: function(user_id) {
        return HOST + 'users/' + user_id + '/shots';
    },
}