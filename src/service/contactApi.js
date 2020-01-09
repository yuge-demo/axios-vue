//对象 包括请求方法和请求路径


const CONTACT_API = {
    //获取联系人列表
    getContactList:{
        method:'get',
        url:'/contactList'
    },
    //新建联系人 form-data
    newConatctFrom:{
        method:'post',
        url:'/contact/new/form'
    },
    //新建联系人 application/json
    newConatctJson:{
        method:'post',
        url:'/contact/new/json'
    },
    //编辑联系人 edit
    editContact:{
        method:'put',
        url:'/contact/edit'
    },
    //删除联系人
    delContact:{
        method:'delete',
        url:'/contact'
    }
}

export default CONTACT_API