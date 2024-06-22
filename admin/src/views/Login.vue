<template>
    <div class="container">
        <div class="bg-img" :style="{
            backgroundImage: `url(${require('@/assets/bus.jpg')})`
        }">
        </div>
        <div class="login-form">
            <el-card shadow="never" style="background-color: #303030; border: 0; border-radius: 10px;">
                <div style="margin: 10px; padding: 10px">
                    <div style="text-align: center;">
                        <span style="font-size: 40px; color: white; font-weight: bold;">LOGIN</span>
                    </div>
                    <div style="text-align: center">
                        <span style="font-size: 25px; color: gray;">Please enter your login and password!</span>
                    </div>
                    <div style="margin-top: 20px">
                        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="auto"
                            class="demo-ruleForm" status-icon>
                            <el-form-item  prop="email">
                                <el-input style="height: 50px; font-size: 30px;" v-model="loginForm.email" placeholder="Email" />
                            </el-form-item>
                            <el-form-item  prop="password">
                                <el-input style="height: 50px; font-size: 30px;" v-model="loginForm.password" type="password" placeholder="Password" />
                            </el-form-item>
                            
                        </el-form>
                        <div style="text-align: center; margin-top: 20px;">
                            <a href="/" style="font-size: 25px; color: gray;">Forgot Password?</a>
                        </div>
                        <div style="display: flex; justify-content: center; margin-top: 20px">
                            <el-button class="my-button" @click="submitForm"
                                style="color: white; background-color: #606060; font-size: 1.5rem; width: 90%; height: 60px">Login</el-button>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <span style="font-size: 20px; color: gray;">Don't have an account?   <a href="/signup" style="font-size: 20px; color: gray;">Sign Up here!</a></span>
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

.login-form {
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
import axios from 'axios';
import { reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const loginForm = reactive({
    email: "",
    password: ""
})

const loginRules = reactive({
    email: [
        {
            required: true, message: 'Please enter email', trigger: "blur"
        }
    ],
    password: [
        {
            required: true, message: 'Please enter password', trigger: "blur"
        }
    ]
})

const loginFormRef = ref()

const submitForm = () => {
    loginFormRef.value.validate((valid) => {
        if (valid) {
            axios.post('/adminapi/user/login',loginForm).then(res => {
                if (res.data.ActionType === 'OK') {
                    console.log('ok')
                    console.log(res.data.data)
                    store.commit('changeUserInfo',res.data.data)
                    if (res.data.data.role === 1) {
                        window.location.href = 'http://localhost:8081/home'
                    } 
                    else {
                        router.push('/center')
                    }
                }
                else if (res.data.ActionType === 1){
                   ElNotification({
                    title:'Warning',
                    message:'Password Incorrect',
                    type:'warning'
                   })
                   loginForm.email = ''
                   loginForm.password = ''
                }
                else {
                    ElNotification({
                    title:'Warning',
                    message:'Email doesnt exist',
                    type:'warning'
                   })
                   loginForm.email = ''
                   loginForm.password = ''
                }
            })
        }
    })
}

</script>