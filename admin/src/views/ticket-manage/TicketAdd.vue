<template>
    <div>
        <el-page-header title="票务管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 新添车票 </span>
            </template>
        </el-page-header>

        <el-form ref="ticketFormRef" style="max-width: 600px" :model="ticketForm" :rules="ticketFormRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="Company Name" prop="companyName">
                <el-select v-model="ticketForm.companyName"  placeholder="Select" style="margin-top: 10px">
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
                <el-date-picker v-model="ticketForm.date" type="date" aria-label="Pick a date" placeholder="Pick a date"
                    style="width: 100%" />
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


            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    Create
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script setup>
import axios from 'axios'
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const ticketFormRef = ref()
const ticketForm = reactive({
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

const ticketFormRules = reactive({
    amount: [
        { required: true, message: 'Please enter amount(number)', trigger: 'blur' },   
    ],
    price: [
        { required: true, message: 'Please enter price(number)', trigger: 'blur' },   
    ]
})

onMounted(() => {
    getCompanyData()
    getPathData()
})

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

    }
)

const submitForm = () => {
    console.log(ticketForm.date)
    ticketFormRef.value.validate(async (valid) => {
        if (valid) {
            axios.post('/adminapi/ticket/add', ticketForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    router.push('/ticket-manage/ticketlist')
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
    margin-top: 13px;
}
</style>