<template>
  <div class="home">
    <!-- <van-popup v-model="showList" position="bottom"> -->
      <!-- 联系人列表 -->
    <van-contact-list
        :list="list"
        @add="onAdd"
        @edit="onEdit"
    />
    <van-popup v-model="showEdit" position="bottom">
        <van-contact-edit
            :contact-info="editingContact"
            :is-edit="isEdit"
            @save="onSave"
            @delete="onDelete"
        />
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
import { ContactList , ContactEdit } from 'vant';
import { Toast } from 'vant';
import { Popup } from 'vant';

export default {
  name: 'home',
  components: {
      [ContactList.name]:ContactList,
      [ContactEdit.name]:ContactEdit,
      [Popup.name]:Popup
  },
  data(){
      return{
          list: [],
          instance: null, //axios实例
          showEdit: false, //控制弹窗的显隐
          editingContact: {}, //正在编辑的联系人数据相当于数据的回显
          isEdit: false //控制新建和编辑
      }
  },
  created(){
      this.instance = axios.create({
          baseURL:'http://localhost:9000/api',
          timeout:1000
      })
      this.getList()
  },
  methods:{
      //获取联系人列表
       async getList(){
            let res = await
            this.$Http.getContactList()
            this.list = res.data
      },
      //添加联系人
      onAdd(){
          this.showEdit = true
          this.isEdit = false
      },
      //编辑联系人
      onEdit(info){
          this.showEdit = true
          this.isEdit = true
          this.editingContact = info
      },
      //保存联系人
       async onSave(info){
          if(this.isEdit){
              //编辑保存
              let res = await
              this.$Http.editContact(info)
              if(res.code === 200){
                       Toast('新建成功')
                       this.showEdit = false
                       this.getList()
              }  
          }
          else{
            //   let res = await
            //   this.$Http.newConatctFrom(info,true)
            //   if(res.data.code === 200){
            //            Toast('新建成功')
            //            this.showEdit = false
            //            this.getList()
            //   }  
              //新建保存
              let res = await
              this.$Http.newConatctJson(info)
              if(res.code === 200){
                       Toast('新建成功')
                       this.showEdit = false
                       this.getList()
              }  
          }
      },
      //删除联系人
       async onDelete(info){
        //   this.instance.delete('/contact',{
        //       params :{
        //           id : info.id
        //       }
        //   }).then(res => {
        //       if(res.data.code === 200){
        //           Toast('删除成功')
        //           this.showEdit = false
        //           this.getList()
        //       }
        //   }).catch(() =>{
        //       Toast('请求失败，请稍候重试')
        //   })
        let res = await
              this.$Http.delContact({
                  id:info.id
              })
              if(res.code === 200){
                Toast('新建成功')
                this.showEdit = false
                this.getList()
              }  
      }
  }
}
</script>
<style lang="less" scoped>
.van-contact-list__add{
    z-index:0
}
.van-popup{
    height: 100%;
}
</style>
