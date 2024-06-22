<template>
    <div>
        <el-card>
            <el-page-header title="公司管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 公司列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="Company Name" width="180" />
                <el-table-column label="Avatar" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
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
            <el-form ref="companyFormRef" style="max-width: 600px" :model="companyForm" :rules="companyFormRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="Company Name" prop="name">
                    <el-input v-model="companyForm.name" />
                </el-form-item>

                <el-form-item label="Avatar" prop="avatar">
                    <Upload :avatar="companyForm.avatar" @kerwinChange="handleChange" />
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
import upload from '@/util/upload';
import Upload from '../../components/Upload/Upload'

const dialogVisible = ref(false)
const companyFormRef = ref()
const tableData = ref([])
let companyForm = reactive({
    name: '',
    avatar: '',
    file: null
})
const companyFormRules = reactive({
    name: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ]
})


onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get('/adminapi/company/list')
    tableData.value = res.data.data
}

//编辑回调
const handleEdit = async (data) => {
    const res = await axios.get(`/adminapi/company/list/${data._id}`)
    Object.assign(companyForm, res.data.data[0])
    dialogVisible.value = true
}

const handleChange = file => {
    companyForm.avatar = URL.createObjectURL(file);
    companyForm.file = file
}

//编辑确认回调
const handleEditConfirm = () => {
    companyFormRef.value.validate(async (valid) => {
        if (valid) {
            //1- 更新后端
            await upload(`/adminapi/company/update/${companyForm._id}`, companyForm)
            //2- dialog隐藏
            dialogVisible.value = false
            //3- 获取table数据
            getTableData()
        }
    })
}

const handleDelete = async (data) => {
    await axios.delete(`/adminapi/company/list/${data._id}`)
    getTableData()
}
</script>

<style lang='scss' scoped>
.el-table {
    margin-top: 50px
}

::v-deep .el-form-item__label {
    margin-top: 20px;
}
</style>