import editComponent from './edit.component.js';
export default angular.module('storeedit', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('storeedit', {
  url: '/store/edit',
  template: '<storeedit></storeedit>'
});
})
.component('storeedit', editComponent);
