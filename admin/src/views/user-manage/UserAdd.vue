<template>
    <div>
        <el-page-header title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加用户 </span>
            </template>
        </el-page-header>

        <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="Email" prop="email">
                <el-input v-model="userForm.email" />
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="userForm.password" />
            </el-form-item>

            <el-form-item label="Role" prop="role">
                <el-select v-model="userForm.role" placeholder="Select" style="margin-top: 10px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>




            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    Add User
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()
const userFormRef = ref()
const userForm = reactive({
    email: '',
    password: '',
    role: 2
})

const userFormRules = reactive({
    email: [
        { required: true, message: 'Please enter email', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please enter password', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ]
})

const options = [{
    label: 'Admin',
    value: 2
},
{
    label: 'User',
    value: 1
}
]


const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            axios.post('/adminapi/user/add', userForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    router.push('/user-manage/userlist')
                }
                else {
                    ElNotification({
                        title: 'Warning',
                        message: 'Email has been registered',
                        type: 'warning'
                    })
                    userForm.email = "",
                        userForm.password = ""
                }
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px
}

::v-deep .el-form-item__label {
    margin-top: 15px;
}
</style>