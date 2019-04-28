import { Base } from '../../utils/base.js';

class Category extends Base {
    constructor() {
        super();
    }

    /*获得所有分类*/
    getCategoryType(callback) {
        var param = {
            url: 'categories',
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
    /*获得某种分类的商品*/
    getProductsByCategory(id, callback) {
        var param = {
            url: 'categories/' + id,
            sCallback: function (data) {
                callback && callback(data);
            }
        };
        this.request(param);
    }
}

export { Category };