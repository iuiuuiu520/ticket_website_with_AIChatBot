<template>
    <div>
        <el-page-header title="路线管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加路线 </span>
            </template>
        </el-page-header>

        <el-form ref="pathFormRef" style="max-width: 600px" :model="pathForm" :rules="pathFormRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="Origin" prop="origin">
                <el-input v-model="pathForm.origin" />
            </el-form-item>

            <el-form-item label="Destination" prop="destination">
                <el-input v-model="pathForm.destination" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    Add Path
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pathFormRef = ref()
const pathForm = reactive({
    origin: '',
    destination: ''
})

const pathFormRules = reactive({
    origin: [
        { required: true, message: 'Please enter origin', trigger: 'blur' },
    ],
    destination: [
        { required: true, message: 'Please enter destination', trigger: 'blur' },
    ]
})


const submitForm = () => {
    pathFormRef.value.validate(async (valid) => {
        if (valid) {
            axios.post('/adminapi/path/add', pathForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    router.push('/path-manage/pathlist')
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