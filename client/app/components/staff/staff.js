/**
 * store
 * @author guanbingchang@wanda.cn
 */

import list from './list/list';
import add from './add/add';


export default angular.module('app.staff', [
    list.name,
    add.name
]);

