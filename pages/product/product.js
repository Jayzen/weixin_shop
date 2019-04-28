import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';

var product = new Product();
var cart = new Cart();

Page({
    data: {
        loadingHidden: false,
        hiddenSmallImg: true,
        countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        productCounts: 1,
        currentTabsIndex: 0,
        cartTotalCounts: 0
    },
    onLoad: function (option) {
        var id = option.id;
        this.data.id = id;
        this._loadData();
    },

    /*加载所有数据*/
    _loadData: function (callback) {
        var that = this;
        product.getDetailInfo(this.data.id, (data) => {
            that.setData({
                cartTotalCounts: cart.getCartTotalCounts().counts1,
                product: data,
                loadingHidden: true
            });
            callback && callback();
        });
    },

    //选择购买数目
    bindPickerChange: function (e) {
        this.setData({
            productCounts: this.data.countsArray[e.detail.value],
        })
    },

    //切换详情面板
    onTabsItemTap: function (event) {
        var index = product.getDataSet(event, 'index');
        this.setData({
            currentTabsIndex: index
        });
    },

    /*添加到购物车*/
    onAddingToCartTap: function (events) {
        this.addToCart();
        this.setData({
            cartTotalCounts: cart.getCartTotalCounts().counts1,
        });
    },

    /*将商品数据添加到内存中*/
    addToCart: function () {
        console.log(this.data.product);
        var tempObj = {}, keys = ['id', 'name', 'price'];
        for (var key in this.data.product) {
            if (keys.indexOf(key) >= 0) {
                tempObj[key] = this.data.product[key];
            }
        }
        tempObj['link'] = this.data.product.image.link;
        cart.add(tempObj, this.data.productCounts);
        console.log(this.data.productCounts);
    },

    /*跳转到购物车*/
    onCartTap: function () {
        wx.switchTab({
            url: '/pages/cart/cart'
        });
    }
})


