<template>
    <div>
        <div class="shopping-cart">
            <!-- Title -->
            <div class="title">
                Purchase Ticket
            </div>

            <!-- Product #1 -->
            <div class="item">


                <div class="image">
                    <img :src="require('../assets/images.jpg')" alt="" />
                </div>

                <div class="description">
                    <span>{{ ticketForm.companyName }}</span>
                    <span>{{ ticketForm.origin }} -> {{ ticketForm.destination }}</span>
                    <span>{{ ticketForm.showDate }}</span>
                    <span>{{ ticketForm.showTime }}</span>
                    <span>RM{{ ticketForm.price }}</span>
                    <span>{{ ticketForm.amount }}</span>
                </div>

                <div class="quantity">
                    <button class="plus-btn" type="button" name="button" @click="minusAmount">
                        -
                    </button>
                    <input type="text" name="name" v-model="ticketForm.quantity">
                    <button class="minus-btn" type="button" name="button" @click="addAmount">
                        +
                    </button>
                </div>
            </div>
            <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                :success-url="successUrl" :cancel-url="cancelUrl" @loading="v => loading = v" />
                
            <div class="total-price">
                <span>Total Price: RM{{ totalPrice }}</span>
                <button class="button-19" @click="handleConfirm">Procced to payment</button>
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

.total-price {
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
}

.total-price span {
    font-size: 30px;
    font-weight: bold;
}

.is-active {
    animation-name: animate;
    animation-duration: .8s;
    animation-iteration-count: 1;
    animation-timing-function: steps(28);
    animation-fill-mode: forwards;
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


.button-19 {
    appearance: button;
    background-color: #1899D6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: din-round, sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .8px;
    line-height: 20px;
    margin: 0;
    outline: none;
    overflow: visible;
    padding: 13px 16px;
    text-align: center;
    text-transform: uppercase;
    touch-action: manipulation;
    transform: translateZ(0);
    transition: filter .2s;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    width: 50%;
}

.button-19:after {
    background-clip: padding-box;
    background-color: #1CB0F6;
    border: solid transparent;
    border-radius: 16px;
    border-width: 0 0 4px;
    bottom: -4px;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
}

.button-19:main,
.button-19:focus {
    user-select: auto;
}

.button-19:hover:not(:disabled) {
    filter: brightness(1.1);
    -webkit-filter: brightness(1.1);
}

.button-19:disabled {
    cursor: auto;
}

.button-19:active {
    border-width: 4px 0 0;
    background: none;
}

.quantity {
    padding-top: 70px;
    margin-right: 20px;
}

.quantity input {
    -webkit-appearance: none;
    border: none;
    text-align: center;
    width: 32px;
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
}

button[class*=btn] {
    width: 30px;
    height: 30px;
    background-color: #E1E8EE;
    border-radius: 6px;
    border: none;
    cursor: pointer;
}

.minus-btn img {
    margin-bottom: 3px;
}

.plus-btn img {
    margin-top: 2px;
}

button:focus,
input:focus {
    outline: 0;
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
import { ref, onMounted, reactive, computed } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


const store = useStore()
const route = useRoute()
const ticketForm = reactive({
    companyName: '',
    origin: '',
    destination: '',
    showDate: '',
    showTime: '',
    price: 0,
    amount: 0,
    quantity: 1,
    _id : route.params.id
})

onMounted(() => {
    getTicketData()
})

const getTicketData = async () => {
    const res = await axios.get(`/adminapi/ticket/list/${route.params.id}`)
    res.data.data[0].price = parseInt(res.data.data[0].price)
    res.data.data[0].amount -= 1
    Object.assign(ticketForm, res.data.data[0])
    ticketForm.totalPrice = ticketForm.quantity * ticketForm.price
}

const minusAmount = () => {
    if (ticketForm.quantity === 1) {
        return
    } else {
        ticketForm.quantity -= 1
        ticketForm.amount += 1
    }
}

const addAmount = () => {
    ticketForm.quantity += 1
    ticketForm.amount -= 1
}

const totalPrice = computed(() => {
    return ticketForm.quantity * ticketForm.price
})

const handleConfirm = async () => {
    console.log(ticketForm)
    store.commit('changeTicketInfo',ticketForm)
    const res = await axios.post('/webapi/create-checkout-session', ticketForm)
    window.location.href = res.data.url
}
</script>