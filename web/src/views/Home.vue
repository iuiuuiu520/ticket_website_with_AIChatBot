<template>
  <div class="container">
    <div class="filter-form">
      <el-card shadow="never" style="background-color: black; border: 0; border-radius: 10px; ">
        <el-form :inline="true" label-position="top" class="demo-form-inline"
          style="display: flex; justify-content: space-between;">
          <el-form-item label="Date" style="width: 40%;">
            <el-date-picker v-model="checkForm.date" type="date" aria-label="Pick a date" placeholder="Pick a date"
              style="width: 100%" />
          </el-form-item>

          <el-form-item label="Origin" style="width: 40%; ">
            <el-select v-model="checkForm.origin" placeholder="Select">
              <el-option v-for="item in arrayPath" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="Destination" style="width: 40%;margin-top: 20px" :style="destinationVisible">
            <el-select v-model="checkForm.destination" placeholder="Select" style="margin-top: 10px">
              <el-option v-for="item in arrayDes" :key="item._id" :label="item.destination" :value="item.destination" />
            </el-select>
          </el-form-item>
        </el-form>

        <div class="check-button">
          <el-form-item>
            <el-button type="primary" @click="submitForm()" class="buttonStyle">
              Check Availability
            </el-button>
          </el-form-item>
        </div>
      </el-card>
    </div>
    <div id="body">
      <div id="chat-circle" class="btn btn-raised" @click="openChat">
        <div id="chat-overlay"></div>
        <fa icon="fa-solid fa-headset" />
      </div>

      <div class="chat-box" :style="{ display: showDisplay }">
        <div class="chat-box-header">
          ChatBot
          <span class="chat-box-toggle">
            <fa icon="fa-solid fa-xmark" @click="openChat" />
          </span>
        </div>
        <div class="chat-box-body">
          <div class="chat-box-overlay"></div>
          <div class="chat-logs" ref="chatBodyRef">
            <div v-for="item in arrayMsg" :key="item.index" :id="`cm-msg-${item.index}`"
              :class="`chat-msg ${item.type}`">
              <span class="msg-avatar">
                <img src="https://i.pinimg.com/236x/73/77/a8/7377a8f52962dd32560f22378ec81e1f.jpg" />
              </span>
              <div v-if="item.type === 'self'" class="cm-msg-text">
                {{ item.msg }}
              </div>
              <div v-else>
                <div v-if="isTyping" class="cm-msg-text">typing...</div>
                <div v-else class="cm-msg-text" v-html="item.msg"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <form @submit.prevent="sendMsg">
            <input type="text" id="chat-input" placeholder="Send a message..." v-model="userMsg" />
            <button class="chat-submit" id="chat-submit">
              <fa icon="fa-solid fa-arrow-right" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Adjust alignment as needed */
  background-image: url('../assets/bus.jpg');
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.filter-form {
  position: absolute;
  top: 50%;
  /* Adjust vertical position */
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 800px;
  /* Use max-width instead of fixed width */
  width: 90%;
  /* Adjust width as needed */
  opacity: 0.8;
}

.el-form-item__label {
  color: white !important;
  font-size: 20px !important;
}

.el-input__wrapper {
  border-radius: 25px !important;
  border: 2px solid !important;
}


.el-select__wrapper {
  border-radius: 25px !important;
  border: 2px solid !important;
  height: 50px;
}

.check-button {
  display: flex;
  justify-content: center;
}

.buttonStyle {
  width: 200px;
  height: 100px;
  border-radius: 25px !important;
  background-color: red;
}

#chat-circle {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: #5A5EB9;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: white;
  padding: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn#my-btn {
  background: white;
  padding-top: 13px;
  padding-bottom: 12px;
  border-radius: 45px;
  padding-right: 40px;
  padding-left: 40px;
  color: #5865C3;
}

#chat-overlay {
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: none;
}


.chat-box {
  background: #efefef;
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 350px;
  max-width: 85vw;
  max-height: 100vh;
  border-radius: 5px;
  /*   box-shadow: 0px 5px 35px 9px #464a92; */
  box-shadow: 0px 5px 35px 9px #ccc;
}

.chat-box-toggle {
  float: right;
  margin-right: 15px;
  cursor: pointer;
}

.chat-box-header {
  background: #5A5EB9;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;
  font-size: 20px;
  padding-top: 17px;
}

.chat-box-body {
  position: relative;
  height: 370px;
  height: auto;
  border: 1px solid #ccc;
  overflow: hidden;
}

.chat-box-body:after {
  content: "";
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=');
  opacity: 0.1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
  z-index: -1;
}


#chat-input {
  background: #f4f7f9;
  width: 100%;
  position: relative;
  height: 47px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  color: #888;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
}

.chat-input>form {
  margin-bottom: 0;
}

#chat-input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #ccc;
}

#chat-input::-moz-placeholder {
  /* Firefox 19+ */
  color: #ccc;
}

#chat-input:-ms-input-placeholder {
  /* IE 10+ */
  color: #ccc;
}

#chat-input:-moz-placeholder {
  /* Firefox 18- */
  color: #ccc;
}

.chat-submit {
  position: absolute;
  bottom: 3px;
  right: 10px;
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: #5A5EB9;
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.chat-logs {
  padding: 15px;
  height: 370px;
  overflow-y: scroll;
  padding-bottom: 10px;
}

.chat-logs::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

.chat-logs::-webkit-scrollbar {
  width: 5px;
  background-color: #F5F5F5;
}

.chat-logs::-webkit-scrollbar-thumb {
  background-color: #5A5EB9;
}



@media only screen and (max-width: 500px) {
  .chat-logs {
    height: 40vh;
  }
}

.chat-msg.user>.msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  width: 15%;
}

.chat-msg.self>.msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: right;
  width: 15%;
}

.cm-msg-text {
  background: white;
  padding: 10px 15px 10px 15px;
  color: #666;
  max-width: 75%;
  float: left;
  margin-left: 10px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 30px;
}

.chat-msg {
  clear: both;
}

.chat-msg.self>.cm-msg-text {
  float: right;
  margin-right: 10px;
  background: #5A5EB9;
  color: white;
}

.cm-msg-button>ul>li {
  list-style: none;
  float: left;
  width: 50%;
}

.cm-msg-button {
  clear: both;
  margin-bottom: 70px;
}
</style>

<script setup>
import { reactive, ref, onMounted, watch, nextTick } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';


const router = useRouter()
var destinationVisible = ref('display:none')
const arrayPath = ref([])
const arrayDes = ref([])
const isTyping = ref(false)
const checkForm = reactive({
  date: '',
  time: '',
  origin: '',
  destination: ''
})

const showDisplay = ref('none');
const arrayMsg = ref([]);
const userMsg = ref('');
const index = ref(1);
const chatBodyRef = ref(null);

onMounted(() => {
  getOrigin();
  scrollToBottom();
})

const getOrigin = async () => {
  const pathData = await axios.get('/adminapi/path/list')
  pathData.data.data.forEach((item) => {
    if (arrayPath.value.indexOf(item.origin) < 0) {
      arrayPath.value.push(item.origin)
    }
  })
}

watch(
  () => checkForm.origin,
  async () => {
    const desData = await axios.post('/adminapi/path/getdestination', checkForm)
    arrayDes.value = desData.data.data
    destinationVisible.value = ''
  }
)

const submitForm = () => {
  console.log(checkForm.date)
  router.push({
    path: '/ticketlist',
    query: {
      date: checkForm.date,
      origin: checkForm.origin,
      destination: checkForm.destination
    }
  })
}

const openChat = () => {
  showDisplay.value = showDisplay.value === 'none' ? '' : 'none';
};

const sendMsg = async () => {
  arrayMsg.value.push({
    index: index.value,
    type: 'self',
    msg: userMsg.value,
  });
  index.value += 1;
  userMsg.value = '';

  isTyping.value = true
  arrayMsg.value.push({
    index: index.value,
    type: 'user'
  })
  const res = await axios.post('/chatapi/getAIMessage', { 'message': userMsg.value })
  arrayMsg.value[index.value - 1].msg = res.data.message
  isTyping.value = false
  index.value += 1

};

const scrollToBottom = () => {
  nextTick(() => {
    if (chatBodyRef.value) {
      console.log('scrollHeight:', chatBodyRef.value.scrollHeight);
      console.log('scrollTop:', chatBodyRef.value.scrollTop);
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
      console.log('Updated scrollTop:', chatBodyRef.value.scrollTop);
    }
  });
};

watch(arrayMsg, () => {
  scrollToBottom();
}, { deep: true });
</script>