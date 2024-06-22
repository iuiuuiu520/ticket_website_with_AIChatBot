<template>
    <el-aside width="200px">
        <el-menu :collapse="$store.state.isCollapsed" :collapse-transition="false" :router="true"
            :default-active="route.fullPath">
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manage" v-admin>
                <template #title>
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/adduser">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon>
                        <message-box />
                    </el-icon>
                    <span>路线管理</span>
                </template>
                <el-menu-item index="/path-manage/addpath">创建路线</el-menu-item>
                <el-menu-item index="/path-manage/pathlist">路线列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon>
                        <reading />
                    </el-icon>
                    <span>公司管理</span>
                </template>
                <el-menu-item index="/company-manage/addcompany">添加公司</el-menu-item>
                <el-menu-item index="/company-manage/companylist">公司列表</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/ticket-manage">
                <template #title>
                    <el-icon>
                        <Ticket />
                    </el-icon>
                    <span>票务管理</span>
                </template>
                <el-menu-item index="/ticket-manage/addticket">添加门票</el-menu-item>
                <el-menu-item index="/ticket-manage/ticketlist">门票列表</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>

</template>


<style lang="scss" scoped>
.el-aside {
    height: 100vh;

    .el-menu {
        height: 100vh;
    }
}
</style>

<script setup>
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer, Ticket } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const route = useRoute()
console.log(route)
// const vAdmin = {
//     mounted(el){
//         if(store.state.userInfo.role !== 1){
//             el.parentNode.removeChild(el)
//         }
//     }
// }
</script>