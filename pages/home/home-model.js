import { Base } from '../../utils/base.js';

class Home extends Base{
    constructor(){
        super();
    }

    /*获取banner栏目信息*/
    getBannerData(id, callback) {
        var param = {
            url: 'banners/' + id,
            sCallback:function(res){
                callback && callback(res);
            }
        }
        this.request(param);
    }

    /*首页主题*/
    getThemeData(callback) {
        var param = {
            url: 'themes',
            sCallback: function (res) {
                callback && callback(res);
            }
        }
        this.request(param);
    }

    /*最近新品*/
    getProductsData(callback) {
        var param = {
            url: 'products/recent',
            sCallback: function (res) {
                callback && callback(res);
            }
        }
        this.request(param);
    }


}
export {Home};