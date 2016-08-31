/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor($scope,Api,$http,treeSvc) {
      "ngInject";
      this.name = 'edit';
      this.Api = Api;
      this.treeSvc = treeSvc;
      this.initTree();
  }
    initTree(){
        //约定：所有抛到后端的都放到这个键下
        this.form = {};

        //拉去列表数据的promise
        this.loadPromise = this.treeSvc.get()

        //这个配置用于避免或减少数据转换
        this.config = {
            //指示子节点的字段名
            fieldOfChildren: 'child',
            //指示节点名的字段
            fieldOfName: 'categoryName',
            //指示节点id的字段
            fieldOfId: 'categoryId'
        };

        
  }
}