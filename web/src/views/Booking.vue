<template>
    <div>
        <div class="shopping-cart">
            <!-- Title -->
            <div class="title">
                My Bookings
            </div>

            <!-- Product #1 -->
            <div class="item">


                <div class="image">
                    <img :src="require('../assets/images.jpg')" alt="" />
                </div>

                <div class="description">
                    <span>{{ bookingForm.companyName }}</span>
                    <span>{{ bookingForm.origin }} -> {{ bookingForm.destination }}</span>
                    <span>{{ bookingForm.showDate }}</span>
                    <span>{{ bookingForm.showTime }}</span> 
                    <span>Quantity:      {{ bookingForm.quantity }}</span>
                </div>

            </div>




        </div>
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

html,
body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: rgba(180, 180, 180, 0.2);
    font-family: 'Roboto', sans-serif;
}

.shopping-cart {
    width: 750px;
    height: 423px;
    margin: 80px auto;
    background: #FFFFFF;
    box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.10);
    border-radius: 6px;

    display: flex;
    flex-direction: column;
}

.title {
    height: 60px;
    border-bottom: 1px solid #E1E8EE;
    padding: 20px 30px;
    color: #5E6977;
    font-size: 18px;
    font-weight: 400;
}

.item {
    padding: 20px 30px;
    height: 60%;
    display: flex;
    border-bottom: 3px solid #E1E8EE;
}

.item:nth-child(3) {
    border-top: 1px solid #E1E8EE;
    border-bottom: 1px solid #E1E8EE;
}


@keyframes animate {
    0% {
        background-position: left;
    }

    50% {
        background-position: right;
    }

    100% {
        background-position: right;
    }
}

.image {
    margin-right: 50px;
}

.image img {
    width: 100px;
}

.description {
    padding-top: 10px;
    margin-right: 60px;
    width: 300px;
}

.description span {
    display: block;
    font-size: 14px;
    color: #43484D;
    font-weight: bold;
    margin-bottom: 10px;
}





@media (max-width: 800px) {
    .shopping-cart {
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .item {
        height: auto;
        flex-wrap: wrap;
        justify-content: center;
    }

    .image img {
        width: 50%;
    }

    .image,
    .quantity,
    .description {
        width: 100%;
        text-align: center;
        margin: 6px 0;
    }
}
</style>

<script setup>
import axios from 'axios';
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex';

const store = useStore()
const bookingForm = reactive({
    companyName: '',
    origin: '',
    destination: '',
    showDate: '',
    showTime: '',
    quantity: 0
})

onMounted(() => {
    getTicketData()
})

const getTicketData = async () => {
    const res = await axios.get(`/webapi/booking/list/${store.state.userInfo.email}`)
    Object.assign(bookingForm, res.data.data[0])
}
</script>