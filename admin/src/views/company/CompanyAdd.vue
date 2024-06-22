<template>
    <div>
        <el-page-header title="公司管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加公司 </span>
            </template>
        </el-page-header>

        <el-form ref="companyFormRef" style="max-width: 600px" :model="companyForm" :rules="companyFormRules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="Company name" prop="name">
                <el-input v-model="companyForm.name" />
            </el-form-item>


            <el-form-item label="Avatar" prop="avatar">
                <Upload :avatar="companyForm.avatar" @kerwinChange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    添加公司
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/Upload/Upload.vue';
import upload from '@/util/upload';
import {useRouter} from 'vue-router'

const router = useRouter()
const companyFormRef = ref()
const companyForm = reactive({
    name: '',
    avatar: '',
    file: null
})

const companyFormRules = reactive({
    name: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})



const handleChange = file => {
    companyForm.avatar = URL.createObjectURL(file);
    companyForm.file = file
}

const submitForm = () => {
    companyFormRef.value.validate(async(valid) => {
        if(valid){
            await upload('/adminapi/company/add',companyForm)

            router.push('/company-manage/companylist')
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px
}

::v-deep .el-form-item__label {
    margin-top: 20px;
}
</style>