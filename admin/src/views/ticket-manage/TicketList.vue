<template>
    <div>
        <el-card>
            <el-page-header title="票务管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 车票列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="companyName" label="Company Name" width="140" />
                <el-table-column prop="origin" label="Origin" width="120" />
                <el-table-column prop="destination" label="Destination" width="120" />
                <el-table-column prop="showDate" label="Date" width="130" />
                <el-table-column prop="showTime" label="Time" width="100" />
                <el-table-column prop="price" label="Price(RM)" width="100" />
                <el-table-column prop="amount" label="Amount" width="100" />



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
            <el-form ref="ticketFormRef" style="max-width: 600px" :model="ticketForm" :rules="ticketFormRules"
                label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="Company Name" prop="companyName">
                    <el-select v-model="ticketForm.companyName" placeholder="Select" style="margin-top: 10px">
                        <el-option v-for="item in arrayCompany" :key="item._id" :label="item.name" :value="item.name" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Origin" prop="origin">
                    <el-select v-model="ticketForm.origin" placeholder="Select" style="margin-top: 10px">
                        <el-option v-for="item in arrayPath" :key="item" :label="item" :value="item" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Destination" prop="destination" :style="destinationVisible">
                    <el-select v-model="ticketForm.destination" placeholder="Select" style="margin-top: 10px">
                        <el-option v-for="item in arrayDes" :key="item._id" :label="item.destination"
                            :value="item.destination" />
                    </el-select>
                </el-form-item>

                <el-form-item prop="date" label="Date">
                    <el-date-picker v-model="ticketForm.date" type="date" aria-label="Pick a date"
                        placeholder="Pick a date" style="width: 100%" />
                </el-form-item>

                <el-form-item prop="time" label='Time'>
                    <el-time-picker v-model="ticketForm.time" aria-label="Pick a time" placeholder="Pick a time"
                        style="width: 100%" />
                </el-form-item>

                <el-form-item label="Price" prop="price">
                    <el-input v-model="ticketForm.price" />
                </el-form-item>

                <el-form-item label="Amount" prop="amount">
                    <el-input v-model="ticketForm.amount" />
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
import { ref, onMounted, reactive, watch } from 'vue'
import axios from 'axios';
import { ElNotification } from 'element-plus'


const dialogVisible = ref(false)
const ticketFormRef = ref()
const tableData = ref([])
let ticketForm = reactive({
    companyName: '',
    origin: '',
    destination: '',
    date: '',
    time: '',
    price: 0,
    amount: 0
})
const arrayCompany = ref([])
const arrayPath = ref([])
const arrayDes = ref([])
var destinationVisible = ref('display:none')


onMounted(() => {
    getTableData()
    getCompanyData()
    getPathData()

})

const getTableData = async () => {
    const res = await axios.get('/adminapi/ticket/list')
    tableData.value = res.data.data
}

const getCompanyData = async () => {
    const companyData = await axios.get('/adminapi/company/list')
    arrayCompany.value = companyData.data.data
}

const getPathData = async () => {
    const pathData = await axios.get('/adminapi/path/list')
    pathData.data.data.forEach((item) => {
        if (arrayPath.value.indexOf(item.origin) < 0) {
            arrayPath.value.push(item.origin)
        }
    })
}

watch(
    () => ticketForm.origin,
    async (origin) => {
        const desData = await axios.post('/adminapi/path/getdestination', ticketForm)
        arrayDes.value = desData.data.data
        destinationVisible.value = ''
        ticketForm.destination = ''

    }
)

const handleEdit = async (data) => {
    const res = await axios.get(`/adminapi/ticket/list/${data._id}`)
    Object.assign(ticketForm, res.data.data[0])
    dialogVisible.value = true
}

const handleEditConfirm = () => {
    ticketFormRef.value.validate(async (valid) => {
        if (valid) {
            console.log(ticketForm._id)
            //1- 更新后端
            axios.put(`/adminapi/ticket/list/${ticketForm._id}`, ticketForm).then(res => {
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
    await axios.delete(`/adminapi/ticket/list/${data._id}`)
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