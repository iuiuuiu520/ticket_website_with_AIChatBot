<template>
    <div>
        <el-container direction="vertical">
            <TopHeader />
            <el-main><router-view /></el-main>
        </el-container>
    </div>
</template>

<script setup>
import TopHeader from '../components/TopHeader'





</script>


<style lang="scss" scoped>
.el-main {
    overflow: auto;
    height: calc(100vh - 60px);
    padding: 0px;
    background-color: rgba(180, 180, 180,0.2);
}
</style>