/**
 * (description)
 * 
 * @author yourname
 */

export default class AddController {
  constructor(Api,treeSvc,$scope,templateSvc) {
  	"ngInject";
    this.name = 'add';
    this.treeSvc= treeSvc;
    this.form = {};
    this.api=Api;
    this.d={};
    this.templateSvc = templateSvc;
        this.loadPromise = this.treeSvc.getSopTree('sop');
        this.config = {
            fieldOfChildren: 'children',
            fieldOfName: 'name',
            fieldOfId: 'nodeId'
        };

  }


tabtree(){
  console.log('app');
    this.loadPromise = this.treeSvc.getAppTree('app');
    this.config = {
        fieldOfChildren: 'children',
        fieldOfName: 'name',
        fieldOfId: 'nodeId'
    };

}

  save(){
    console.log(this.d)
     this.api.post('/role/operate/act/save',this.d).then(res=>{alert('保存成功'),err=>{alert(err)}})
  }

}
