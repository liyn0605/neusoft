/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,$http,staffnewSvc,NgTableParams,$state,templateSvc,$q) {
  	 "ngInject";
  	//var vm = this;
  //  this.name = 'list';
    this.$state = $state;
    this.staffnewSvc=staffnewSvc;
  	this.NgTableParams = NgTableParams;
  	this.$scope = $scope;
    this.templateSvc= templateSvc;
    this.q = $q;
      
  	this.nowRow=null;
  	this.init();
    
      
  
// 员工状态

  	this.staffstatus = [{ id: 1, name: '冻结' }, { id: 3, name: '恢复' }];

// 模板

  	$scope.template_name = [{ id: 1, name: '模板1' }, { id: 2, name: '模板2' }, { id: 3, name: '模板3' }];
    
	// 区域

  	$scope.staffarea = [{ id: 1, name: '区域1' }, { id: 2, name: '区域2' }, { id: 3, name: '区域3' }];

//广场

  	$scope.square = [{ id: 1, name: '广场1' }, { id: 2, name: '广场2' }, { id: 3, name: '广场3' }];

//品牌
  	this.brand = [{ id: 1, name: '品牌1' }, { id: 2, name: '品牌2' }, { id: 3, name: '品牌3' }];


//门店
  	$scope.store = [{ id: 1, name: '门店1' }, { id: 2, name: '门店2' }, { id: 3, name: '门店3' }];



 this.filter = {
      limit: 10,
      name: '',
      storeid:this.$state.params.storeid
      // phone: '',
      // action_1: '',
      // button_name: '',
      // status: '',
      // update_start_time: '',
      // update_end_time: ''
    };
  }


  searchbystaff(){

  	this.staffnewSvc.getstaffpage()

  }
  //修改员工状态
  changeStatus(){
      this.staffnewSvc.changeStatus()
  }
	 /**
   * 获取格式化后的数据
   */ 
  getSearchFormData(){
    let filter = this.filter,
        selectObj = this.selectObj;

    // filter.track_page_type_id = selectObj.pageType.id;
    // filter.business_code = selectObj.business.business_code;

    return filter;
  }

//获取模板名称
  getTemplateList(temlateName){
    let deferred = this.q.defer();
    let templateList = this.templateSvc.getPageTempbyname(temlateName).then((result)=>{
      return result.datas;
    });
    deferred.resolve(templateList);
    return deferred.promise;
  }
/**
   * [init 初始化]
   */

  init($scope){
    let self = this;
    this.tableParams = new this.NgTableParams({
      count: 10 //每页几条
    }, {
      counts:[],
      getData: function(params) {

        self.loading = true;
        let formData = self.getSearchFormData();
        formData.page = params.url().page;
        self.loadPromise = self.staffnewSvc.getPageUserList(formData);
        return self.loadPromise
        .then(result => {
           self.loading = false;
         console.log(result.length);
          if(result){
            params.total(result.total);
            return result; 
          }
        });
      }
    });
  }

		   search(){
          this.tableParams.parameters({page : 1}).reload();
		}

		   reset(){

        this.filter = {
          limit: 10,
          name: '',
          phone: '',
          action_1: '',
          status: '',
          update_start_time: '',
          update_end_time: '',
            storeid:this.$state.params.storeid
        };

    }

  /**
   * 获取员工详情
   */
  detail(id){
    this.$state.go('staffdetail', {id: id});
  }


  //跳转到新增员工
  getstaffpageadd(){
      this.staffnewSvc.getstaffpage()

  } 
  edit(id){
     //this.staffnewSvc.updatestaff()
     this.$state.go('staffedit', {id: id});
  }

  //更新员工状态
  changeStatus(){
    //debugger;
      this.staffnewSvc.changeStatus({id:this.nowRow.uid,status:this.nowRow.status=='正常'?3:1}).then(success=>{
          //this.$modalInstance.close()
          alert("修改成功")
          $('#myModal').modal('hide');
          this.init();
      })
  }
  //传值给 冻结 窗口
  editInfo (a,b){
      this.nowRow=b;
    // $scope.vm.status_id = b.uid;
    }
}