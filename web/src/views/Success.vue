<template>
    <div class="layout">
        <div class="success">
            <el-icon :size="50">
                <SuccessFilled />
            </el-icon>
        </div>
        <h1 class="abc">Payment Successful!</h1>
        <h4 class="def">Your payment has been completed!</h4>
    </div>
</template>

<style lang="scss">
.success {
    position: absolute;
    top: 30%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    width: 100%;
    height: 100%;
}

.abc {
    position: absolute;
    top: 40%;
    left: 40%;
    margin-top: -50px;
    width: 100%;
    height: 100%;
}

.def {
    position: absolute;
    top: 50%;
    left: 39%;
    margin-top: -50px;
    width: 100%;
    height: 100%;
}
</style>

<script setup>
import { SuccessFilled } from '@element-plus/icons-vue'
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore()
const bookingForm = {
    ...store.state.ticketInfo,
    email: store.state.userInfo.email

}

console.log(store.state.ticketInfo.amount)
const createBooking = async () => {
    if (Object.keys(store.state.ticketInfo).length !== 0) {
        axios.post('/webapi/booking/add', bookingForm).then(res => {
            if (res.data.ActionType === 'OK') {
                axios.post(`/webapi/ticket/updateAmount/${store.state.ticketInfo._id}`, { amount: store.state.ticketInfo.amount }).then(res => {
                    if (res.data.ActionType === 'OK') {
                        store.commit('clearTicketInfo')
                    }
                })
            }
        })
    }
    else {
        console.log(1)
        return
    }

}

createBooking()
</script>