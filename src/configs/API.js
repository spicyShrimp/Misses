const apiPath = 'http://d.api.budejie.com/topic/';

const API = {
    //精选
    essence: {
        recommend: (np) => apiPath + 'list/jingxuan/1/bs0315-iphone-4.5.9/' + np + '-20.json',
        picture: (np) => apiPath + 'list/jingxuan/10/bs0315-iphone-4.5.9/' + np + '-20.json',
        video: (np) => apiPath + 'list/jingxuan/41/bs0315-iphone-4.5.9/' + np + '-20.json',
        joke: (np) => apiPath + 'tag-topic/63674/hot/bs0315-iphone-4.5.9/' + np + '-20.json',
        hot: (np) => apiPath + 'list/remen/1/bs0315-iphone-4.5.9/' + np + '-20.json',
    },
    //最新
    new: {
        all: (np) => apiPath + 'list/zuixin/1/bs0315-iphone-4.5.9/' + np + '-20.json',
        video: (np) => apiPath + 'list/zuixin/41/bs0315-iphone-4.5.9/' + np + '-20.json',
        picture: (np) => apiPath + 'list/zuixin/10/bs0315-iphone-4.5.9/' + np + '-20.json',
        joke: (np) => apiPath + 'list/zuixin/29/bs0315-iphone-4.5.9/' + np + '-20.json',
        movie: (np) => apiPath + 'tag-topic/407/new/bs0315-iphone-4.5.9/' + np + '-20.json',
    },
    //穿越
    through: {
        all: (np) => apiPath + 'list/chuanyue/1/bs0315-iphone-4.5.9/' + np + '-20.json',
        video: (np) => apiPath + 'list/chuanyue/41/bs0315-iphone-4.5.9/' + np + '-20.json',
        picture: (np) => apiPath + 'list/chuanyue/10/bs0315-iphone-4.5.9/' + np + '-20.json',
        joke: (np) => apiPath + 'list/chuanyue/29/bs0315-iphone-4.5.9/' + np + '-20.json',
        audio: (np) => apiPath + 'list/chuanyue/29/bs0315-iphone-4.5.9/' + np + '-20.json',
    },
    //评论列表
    comment: (id, np) => apiPath + 'comment_list/'+ id +'/2/bs0315-iphone-4.5.9/' + np + '-20.json',
}

export default API;