<template>
    <div class="layout">
        <div class="flex-container">
            <div>
                <el-card style="width: 480px; height: 60px; font-size: 20px; text-align: center;font-weight: bold;"
                    shadow="always">{{ filterData.origin }} to {{ filterData.destination }}</el-card>
            </div>

            <div class="picker">
                <el-date-picker v-model="filterDate" type="date" placeholder="Pick a day" size="large" />
            </div>
        </div>

        <div class="ticket-list">
            <el-table :data="tableData" style="width: 80%">
                <el-table-column prop="companyName" label="Company Name" width="140" />
                <el-table-column prop="origin" label="Origin" width="120" />
                <el-table-column prop="destination" label="Destination" width="120" />
                <el-table-column prop="showDate" label="Date" width="130" />
                <el-table-column prop="showTime" label="Time" width="100" />
                <el-table-column prop="price" label="Price(RM)" width="100" />
                <el-table-column prop="amount" label="Amount" width="100" />



                <el-table-column label="Action">
                    <template #default="scope">
                        <el-button size="small" @click="handleSelect(scope.row)">
                            Select
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="dialogVisible" title="Quantity" width="500">
            <div class="detail">
                <span style="margin-top: 10px;">Company Name: &nbsp; &nbsp;<b>{{ ticketForm.companyName
                        }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Origin: &nbsp;&nbsp; <b>{{ ticketForm.origin }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Destination:&nbsp;&nbsp; <b>{{ ticketForm.destination }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Date: &nbsp;&nbsp;<b>{{ ticketForm.showDate }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Time: &nbsp;&nbsp;<b>{{ ticketForm.showTime }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Amount: &nbsp;&nbsp;<b>{{ ticketForm.amount }}</b></span><br>
            </div>
            <div class="detail">
                <span style="margin-top: 10px;">Price(RM): &nbsp;&nbsp;<b>RM{{ ticketForm.price }}</b></span><br>
            </div>
            <div class="detail" style="display: inline-block;">
                <span>Quantity: &nbsp;&nbsp;
                    <button @click="minusQuantity">-</button>
                    <input v-model="ticketForm.quantity"
                        style="margin-left: 10px; margin-right: 10px; text-align: center;">
                    <button @click="addQuantity">+</button>
                </span>
            </div>

            <div class="detail">
                <span style="margin-top: 10px;">Total Price(RM): &nbsp;&nbsp;<b>RM{{ totalPrice }}</b></span><br>
            </div>

            <stripe-checkout ref="checkoutRef" mode="payment" :pk="publishableKey" :line-items="lineItems"
                :success-url="successUrl" :cancel-url="cancelUrl" @loading="v => loading = v" />



            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>


<style lang="scss">
.layout {
    width: calc(100% - 200px);
    background-color: white;
    height: calc(100vh - 60px);
    margin-left: 100px;
    margin-right: 100px;
}

.flex-container {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
}

.detail {
    margin-top: 10px;
}

.el-input__wrapper {
    height: 50px;
}

.ticket-list {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter()
const dialogVisible = ref(false)
const route = useRoute()
const filterDate = ref('')
const tableData = ref([])
const filterData = reactive({
    origin: route.query.origin,
    date: route.query.date,
    destination: route.query.destination,
})
const ticketForm = reactive({
    companyName: '',
    origin: '',
    destination: '',
    showDate: '',
    showTime: '',
    price: 0,
    amount: 0,
    quantity: 1
})



onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    filterDate.value = route.query.date
    const res = await axios.post('/webapi/ticket/list', filterData)
    tableData.value = res.data.data
    console.log(tableData.value)
}

const handleSelect = async (data) => {
    // const res = await axios.get(`/adminapi/ticket/list/${data._id}`)
    // res.data.data[0].price = parseInt(res.data.data[0].price)
    // res.data.data[0].amount -= 1
    // Object.assign(ticketForm, res.data.data[0])
    // ticketForm.totalPrice = ticketForm.quantity * ticketForm.price
    // dialogVisible.value = true
    router.push(`/purchaseticket/${data._id}`)
}

const minusQuantity = () => {
    if (ticketForm.quantity === 1) {
        return
    } else {
        ticketForm.quantity -= 1
        ticketForm.amount += 1
    }
}

const addQuantity = () => {
    ticketForm.quantity += 1
    ticketForm.amount -= 1
}

const totalPrice = computed(() => {
    return ticketForm.quantity * ticketForm.price
})

const handleConfirm = async () => {
    const res = await axios.post('/webapi/create-checkout-session', ticketForm)
    window.location.href = res.data.url
}
</script>