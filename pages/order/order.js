import { Order } from '../order/order-model.js';
import { Cart } from '../cart/cart-model.js';
import { Address } from '../../utils/address.js';

var cart = new Cart();
var address = new Address();
var order = new Order();

Page({

    data: {

    },

    onLoad: function (options) {
        var productsArr;
        this.data.account = options.account;
        productsArr = cart.getCartDataFromLocal(true);

        this.setData({
            productsArr: productsArr,
            account: options.account,
            orderStatus: 0
        });

        /*显示收获地址*/
        address.getAddress((res) => {
            this._bindAddressInfo(res);
        });
    },

    editAddress: function (event) {
        var that = this;
        wx.chooseAddress({
            success: function (res) {
                console.log(res);
                var addressInfo = {
                    name: res.userName,
                    mobile: res.telNumber,
                    totalDetail: address.setAddressInfo(res)
                }
                that._bindAddressInfo(addressInfo);

                //保存地址
                address.submitAddress(res, (flag) => {
                    if (!flag) {
                        that.showTips('操作提示', '地址信息更新失败！');
                    }
                });
            }
        })
    },

    /*绑定地址信息*/
    _bindAddressInfo: function (addressInfo) {
        this.setData({
            addressInfo: addressInfo
        });
    },

    onReady: function () {
    },

    /*
        * 提示窗口
        * params:
        * title - {string}标题
        * content - {string}内容
        * flag - {bool}是否跳转到 "我的页面"
        */
    showTips: function (title, content, flag) {
        wx.showModal({
            title: title,
            content: content,
            showCancel: false,
            success: function (res) {
                if (flag) {
                    wx.switchTab({
                        url: '/pages/my/my'
                    });
                }
            }
        });
    }


})