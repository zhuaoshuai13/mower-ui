<script setup>
import { useConfigStore } from '@/stores/config'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'

const axios = inject('axios')

const store = useConfigStore()

const {
  mail_enable,
  account,
  pass_code,
  maa_enable,
  maa_path,
  maa_adb_path,
  maa_weekly_plan,
  maa_rg_enable
} = storeToRefs(store)

async function select_maa_dir() {
  const response = await axios.get(`${import.meta.env.VITE_HTTP_URL}/dialog/folder`)
  const folder_path = response.data
  if (folder_path) {
    maa_path.value = folder_path
  }
}

async function select_maa_adb_path() {
  const response = await axios.get(`${import.meta.env.VITE_HTTP_URL}/dialog/file`)
  const file_path = response.data
  if (file_path) {
    maa_adb_path.value = file_path
  }
}
</script>

<template>
  <div class="home-container">
    <n-card>
      <template #header>
        <n-checkbox v-model:checked="mail_enable">
          <div class="card-title">邮件提醒</div>
        </n-checkbox>
      </template>
      <template #default>
        <table>
          <tr>
            <td class="table-space">QQ邮箱</td>
            <td class="table-space"><n-input v-model:value="account"></n-input></td>
            <td class="table-space">授权码</td>
            <td><n-input v-model:value="pass_code"></n-input></td>
          </tr>
        </table>
      </template>
    </n-card>
    <n-card>
      <template #header>
        <n-checkbox v-model:checked="maa_enable">
          <div class="card-title">MAA</div>
        </n-checkbox>
      </template>
      <template #default>
        <table class="maa-table">
          <tr>
            <td class="table-space maa-table-label">MAA目录</td>
            <td class="input-td"><n-input v-model:value="maa_path" disabled></n-input></td>
            <td class="table-space">
              <n-button @click="select_maa_dir">...</n-button>
            </td>
          </tr>
          <tr>
            <td class="table-space">adb地址</td>
            <td><n-input v-model:value="maa_adb_path" disabled></n-input></td>
            <td>
              <n-button @click="select_maa_adb_path">...</n-button>
            </td>
          </tr>
          <tr>
            <td class="table-space">肉鸽：</td>
            <td colspan="3">
              <n-radio-group v-model:value="maa_rg_enable">
                <n-space>
                  <n-radio :value="1">启用</n-radio>
                  <n-radio :value="0">禁用</n-radio>
                </n-space>
              </n-radio-group>
            </td>
          </tr>
        </table>
        <n-h3>周计划</n-h3>
        <table>
          <tr v-for="plan in maa_weekly_plan" :key="plan.weekday">
            <td class="table-space">
              <n-h4>{{ plan.weekday }}</n-h4>
            </td>
            <td>关卡：</td>
            <td class="table-space">
              <n-input v-model:value="plan.stage"></n-input>
            </td>
            <td>理智药：</td>
            <td>
              <n-input-number v-model:value="plan.medicine"></n-input-number>
            </td>
          </tr>
        </table>
      </template>
    </n-card>
  </div>
</template>

<style scoped>
h4 {
  margin: 0;
}

.card-title {
  font-weight: 500;
  font-size: 16px;
}

.maa-table {
  width: 100%;
}

.maa-table-label {
  width: 70px;
}
</style>
