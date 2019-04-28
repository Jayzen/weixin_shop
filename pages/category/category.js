import {Category} from 'category-model.js';
var category = new Category(); //实例化 home 的推荐页面

Page({
    data: {
        currentMenuIndex: 0,
        loadedData: {}
    },

    onLoad: function() {
        this._loadData();
    },

    /*加载所有数据*/
    _loadData: function(callback) {
        category.getCategoryType((categoryData) => {
            this.setData({
                categoryTypeArr: categoryData,
            });
            category.getProductsByCategory(categoryData[0].id, (data) => {
                var dataObj = {
                    procucts: data.products,
                    topImgUrl: data.topic_image.link,
                    name: data.name
                };
                this.setData({
                  categoryProducts: dataObj
                });
                this.data.loadedData[0] = dataObj;
            });
        });
    }, 

    //判断当前分类数据是否已经被加载
    isLoadedData: function(index){
        if (this.data.loadedData[index]){
            return true;
        }
        else{
            return false;
        }
    },

    changeCategory: function(event){
        var index = category.getDataSet(event, 'index');
        var id = category.getDataSet(event, 'id');

        this.setData({
            currentMenuIndex: index
        });
        
        if (!this.isLoadedData(index)){
            //如果没有加载过当前分类的商品数据
            category.getProductsByCategory(id, (data) => {
                var dataObj = {
                    procucts: data.products,
                    topImgUrl: data.topic_image.link,
                    name: data.name
                };
                this.setData({
                    categoryProducts: dataObj
                });
                this.data.loadedData[index] = dataObj;
            });
        }else{
            //如果已经加载过当前分类商品数据，直接加载
            this.setData({
                categoryProducts: this.data.loadedData[index]
            });
        }
    },

    onProductsItemTap: function(event){
        var id = category.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../product/product?id=' + id
        })
    }
})