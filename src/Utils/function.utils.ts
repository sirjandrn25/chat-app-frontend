
import UserModule from '../Modules/User/user.module';
import ModalUtil from './modal.utils';


export const openUserProfile = ()=>{
    return ModalUtil.open({
        title:'User Profile',
        component:UserModule
    })
}