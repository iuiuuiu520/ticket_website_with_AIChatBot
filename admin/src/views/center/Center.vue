<template>
    <div>
        <el-page-header title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>

        <el-card>
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                </div>
            </template>
            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                label-width="auto" class="demo-ruleForm" status-icon>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="userForm.email" />
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input v-model="userForm.password" />
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm">
                        更新
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>


    </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus';
import axios from 'axios';

const store = useStore()

const { email } = store.state.userInfo

const userFormRef = ref()
const userForm = reactive({
    email,
    password: ""
})

const userFormRules = reactive({
    email: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please enter password', trigger: 'blur' },
    ],


})

const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            axios.post('/adminapi/user/update', userForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    store.commit("changeUserInfo", res.data.data)
                    ElMessage.success('更新成功')
                    console.log(12312)
                }
            })
        }
    })
}
</script>

<style lang='scss' scoped>
.el-card {
    margin-top: 50px
}

::v-deep .el-form-item__label {
    margin-top: 17px;
}
</style>