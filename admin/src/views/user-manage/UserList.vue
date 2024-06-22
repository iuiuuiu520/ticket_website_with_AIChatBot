<template>
    <div>
        <el-card>
            <el-page-header title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="email" label="Email" width="180" />
                <el-table-column label="Role" width="180">
                    <template #default="scope">
                        <!-- {{ scope.row.role === 1 ? '管理员' : '编辑' }} -->
                        <el-tag v-if="scope.row.role === 2" type="danger">Admin</el-tag>
                        <el-tag v-else-if="scope.row.role === 1" type="success">User</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="Action">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-dialog v-model="dialogVisible" title="编辑用户" width="500">
            <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userFormRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="userForm.email" />
                </el-form-item>

                <el-form-item label="Password" prop="password">
                    <el-input type="password" v-model="userForm.password" />
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" placeholder="Select">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>


            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios';
import { ElNotification } from 'element-plus'

const dialogVisible = ref(false)
const userFormRef = ref()
const tableData = ref([])
let userForm = reactive({
    email: '',
    password: '',
    role: 2
})

const options = [{
    label: 'admin',
    value: 1
},
{
    label: 'user',
    value: 2
}
]

onMounted(() => {
    getTableData()

})

const getTableData = async () => {
    const res = await axios.get('/adminapi/user/list')
    tableData.value = res.data.data
}

const handleEdit = async (data) => {
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    Object.assign(userForm, res.data.data[0])
    dialogVisible.value = true
}

const handleEditConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            //1- 更新后端
            axios.put(`/adminapi/user/list/${userForm._id}`, userForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    //2- dialog隐藏
                    dialogVisible.value = false
                    //3- 获取table数据
                    getTableData()
                } else {
                    ElNotification({
                    title:'Warning',
                    message:'Email existed',
                    type:'warning'
                   })
                   userForm.email = ''
                   userForm.password = ''
                }
            })

        }
    })
}

const handleDelete = async (data) => {
    await axios.delete(`/adminapi/user/list/${data._id}`)
    getTableData()
}
</script>

<style lang='scss' scoped>
.el-table {
    margin-top: 50px
}

::v-deep .el-form-item__label {
    margin-top: 15px;
}
</style>