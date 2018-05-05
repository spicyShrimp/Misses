const apiPath = 'http://d.api.budejie.com/topic/';

const API = {
    essence: {
        recommend: apiPath + 'list/jingxuan/1/bs0315-iphone-4.5.9/',
        picture: apiPath + 'list/jingxuan/10/bs0315-iphone-4.5.9/',
        video: apiPath + 'list/jingxuan/41/bs0315-iphone-4.5.9/',
        joke: apiPath + 'tag-topic/63674/hot/bs0315-iphone-4.5.9/',
        hot: apiPath + 'list/remen/1/bs0315-iphone-4.5.9/',
    },
    new: {
        all: apiPath + 'list/zuixin/1/bs0315-iphone-4.5.9/',
        video: apiPath + 'list/zuixin/41/bs0315-iphone-4.5.9/',
        picture: apiPath + 'list/zuixin/10/bs0315-iphone-4.5.9/',
        joke: apiPath + 'list/zuixin/29/bs0315-iphone-4.5.9/',
        movie: apiPath + 'tag-topic/407/new/bs0315-iphone-4.5.9/',
    },
    through: {
        all: apiPath + 'list/chuanyue/1/bs0315-iphone-4.5.9/',
        video: apiPath + 'list/chuanyue/41/bs0315-iphone-4.5.9/',
        picture: apiPath + 'list/chuanyue/10/bs0315-iphone-4.5.9/',
        joke: apiPath + 'list/chuanyue/29/bs0315-iphone-4.5.9/',
        audio: apiPath + 'list/chuanyue/29/bs0315-iphone-4.5.9/',
    },
}

export default API;