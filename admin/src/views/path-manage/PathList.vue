<template>
    <div>
        <el-card>
            <el-page-header title="路线管理">
                <template #content>
                    <span class="text-large font-600 mr-3" autofocus> 路线列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="origin" label="Origin" width="180" />
                <el-table-column prop="destination" label="Destination" width="180" />

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

        <el-dialog v-model="dialogVisible" title="编辑路线" width="500">
            <el-form ref="pathFormRef" style="max-width: 600px" :model="pathForm" :rules="pathFormRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="Origin" prop="origin">
                    <el-input v-model="pathForm.origin" />
                </el-form-item>

                <el-form-item label="Destination" prop="destination">
                    <el-input v-model="pathForm.destination" />
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
const pathFormRef = ref()
const tableData = ref([])
let pathForm = reactive({
    _id: '',
    origin: '',
    destination: ''
})


onMounted(() => {
    getTableData()

})

const getTableData = async () => {
    const res = await axios.get('/adminapi/path/list')
    tableData.value = res.data.data
    console.log(tableData.value)
}

const handleEdit = async (data) => {
    const res = await axios.get(`/adminapi/path/list/${data._id}`)
    Object.assign(pathForm, res.data.data[0])
    dialogVisible.value = true
}

const handleEditConfirm = () => {
    pathFormRef.value.validate(async (valid) => {
        if (valid) {
            //1- 更新后端
            axios.put(`/adminapi/path/list/${pathForm._id}`, pathForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    //2- dialog隐藏
                    dialogVisible.value = false
                    //3- 获取table数据
                    getTableData()
                }
            })
        }
    })
}

const handleDelete = async (data) => {
    await axios.delete(`/adminapi/path/list/${data._id}`)
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