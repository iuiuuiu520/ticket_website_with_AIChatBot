<template>
    <div>
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops! This Page Could Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed. name changed , is
                    temporarily unavailable or you don't have access</p>
                <button @click="goLogin()">Go To Login Page</button>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
body {
    padding: 0;
    margin: 0;
}

#notfound {
    position: relative;
    height: 100vh;
}

#notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.notfound .notfound-404 {
    position: relative;
    height: 150px;
    line-height: 150px;
    margin-bottom: 25px;
}

h1 {
    font-family: titillium web, sans-serif;
    font-size: 186px;
    font-weight: 900;
    margin: 0;
    text-transform: uppercase;
    background: url(../assets/404.png);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: cover;
    background-position: center;
}

h2 {
    font-family: sans-serif;
    font-size: 26px;
    font-weight: 700;
    margin: 0;
}

p {
    font-family: montserrat, sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0;
    text-transform: uppercase;
}

button {
    font-family: titillium web, sans-serif;
    display: inline-block;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    border: none;
    background: #5c91fe;
    padding: 10px 40px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 1px;
    margin-top: 15px;
    -webkit-transition: .2s all;
    transition: .2s all;
}
</style>

<script setup>
import {useStore} from 'vuex'
import {useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const goLogin = () => {
    localStorage.removeItem("token")
    store.commit('clearUserInfo')
    router.push('/login')
}
</script>