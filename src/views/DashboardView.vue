<template>
    <div class="dashboard-view">
        <SidebarMenu />
        <div class="main-content">
        <HeaderBar />
        <Calendar_Small />
        <StartShiftButton />
        <EarningsSummary />
        <UpcomingShift />
        </div>
    </div>
</template>

<script setup>
    import SidebarMenu from '../components/SidebarMenu.vue'
    import HeaderBar from '../components/HeaderBar.vue'
    import Calendar_Small from '../components/Calendar_Small.vue'
    import StartShiftButton from '../components/StartShiftButton.vue'
    import EarningsSummary from '../components/EarningsSummary.vue'
    import UpcomingShift from '../components/UpcomingShift.vue'
    </script>

    <style scoped>
    .dashboard-view {
    display: flex;
    }
    .main-content {
    margin-left: 20px;
    }
</style>