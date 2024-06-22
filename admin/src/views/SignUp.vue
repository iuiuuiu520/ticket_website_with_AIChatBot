<template>
    <div class="container">
        <div class="bg-img" :style="{
            backgroundImage: `url(${require('@/assets/bus.jpg')})`
        }">
        </div>

        <div class="signup-form">
            <el-card shadow="never" style="background-color: #303030; border: 0; border-radius: 10px;">
                <div style="margin: 10px; padding: 10px">
                    <div style="text-align: center;">
                        <span style="font-size: 40px; color: white; font-weight: bold;">SIGN UP</span>
                    </div>
                    <div style="margin-top: 20px">
                        <el-form ref="signupFormRef" :model="signupForm" :rules="signupRules" label-width="auto"
                            class="demo-ruleForm" status-icon>
                            <el-form-item  prop="email">
                                <el-input style="height: 50px; font-size: 30px;" v-model="signupForm.email" placeholder="Email" />
                            </el-form-item>
                            <el-form-item  prop="password">
                                <el-input style="height: 50px; font-size: 30px;" v-model="signupForm.password" type="password" placeholder="Password" />
                            </el-form-item>
                            <el-form-item  prop="confirmPassword">
                                <el-input style="height: 50px; font-size: 30px;" v-model="signupForm.confirmPassword" type="password" placeholder="Confirm Password" />
                            </el-form-item>
                            
                        </el-form>
                        <div style="display: flex; justify-content: center; margin-top: 30px">
                            <el-button class="my-button" @click="submitForm"
                                style="color: white; background-color: #606060; font-size: 1.5rem; width: 90%; height: 60px">Sign Up</el-button>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <span style="font-size: 20px; color: gray;">Already have an account?   <a href="/login" style="font-size: 20px; color: gray;">Login</a></span>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    position: relative;
    margin: 0px;
    padding: 0px;

}

.bg-img {
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.signup-form {
    position: absolute;
    top: 100px;
    right: 100px;
    height: 100%;
    width: 30%;
}

.el-input {
    margin-top: 20px;
}
</style>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'
import { ElNotification } from 'element-plus'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const signupForm = reactive({
    email: "",
    password: "",
    confirmPassword: ''
})

const checkPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Please input password again'))
    } else if ( value !== signupForm.password) {
        callback(new Error('Two inputs dont match!'))
    } else {
        callback()
    }
}

const signupRules = reactive({
    email: [
        {
            required: true, message: 'Please enter email', trigger: "blur"
        }
    ],
    password: [
        {
            required: true, message: 'Please enter password', trigger: "blur"
        }
    ],
    confirmPassword: [
        {
            validator: checkPassword, trigger: "blur"
        }
    ]
})



const signupFormRef = ref()

const submitForm = () => {
    signupFormRef.value.validate((valid) => {
        if (valid) {
            axios.post('/adminapi/user/signup', signupForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    console.log('ok')
                    console.log(res.data.data)
                    store.commit('changeUserInfo',res.data.data)
                    window.location.href = 'http://localhost:8081/home'
                }
                else {
                    ElNotification({
                    title:'Warning',
                    message:'Email has been registered',
                    type:'warning'
                   })
                   signupForm.email = ''
                   signupForm.password = ''
                   signupForm.confirmPassword = ''
                }
            })
        }
    })
}
</script>