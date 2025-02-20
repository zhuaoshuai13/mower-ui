import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from 'axios'

export const useConfigStore = defineStore('config', () => {
  const adb = ref('')
  const drone_count_limit = ref(0)
  const drone_room = ref('')
  const enable_party = ref(true)
  const free_blacklist = ref('')
  const maa_adb_path = ref('')
  const maa_enable = ref(false)
  const maa_path = ref('')
  const maa_weekly_plan = ref([])
  const maa_rg_enable = ref(0)
  const mail_enable = ref(false)
  const account = ref('')
  const pass_code = ref('')
  const package_type = ref('official')
  const plan_file = ref('')
  const reload_room = ref('')
  const run_mode = ref(1)
  const run_order_delay = ref(10)
  const start_automatically = ref(false)

  async function load_config() {
    const response = await axios.get(`${import.meta.env.VITE_HTTP_URL}/conf`)
    adb.value = response.data.adb
    drone_count_limit.value = response.data.drone_count_limit.toString()
    drone_room.value = response.data.drone_room
    enable_party.value = response.data.enable_party != 0
    free_blacklist.value = response.data.free_blacklist == '' ? [] : response.data.free_blacklist
    maa_adb_path.value = response.data.maa_adb_path
    maa_enable.value = response.data.maa_enable != 0
    maa_path.value = response.data.maa_path
    maa_rg_enable.value = response.data.maa_rg_enable
    maa_weekly_plan.value = response.data.maa_weekly_plan
    mail_enable.value = response.data.mail_enable != 0
    account.value = response.data.account
    pass_code.value = response.data.pass_code
    package_type.value = response.data.package_type == 1 ? 'official' : 'bilibili'
    plan_file.value = response.data.planFile
    reload_room.value = response.data.reload_room == '' ? [] : response.data.reload_room.split(',')
    run_mode.value = response.data.run_mode == 2 ? 'orders_only' : 'full'
    run_order_delay.value = response.data.run_order_delay.toString()
    start_automatically.value = response.data.start_automatically
  }

  function build_config() {
    return {
      account: account.value,
      adb: adb.value,
      drone_count_limit: parseInt(drone_count_limit.value),
      drone_room: drone_room.value,
      enable_party: enable_party.value ? 1 : 0,
      free_blacklist: free_blacklist.value.join(','),
      maa_adb_path: maa_adb_path.value,
      maa_enable: maa_enable.value ? 1 : 0,
      maa_path: maa_path.value,
      maa_rg_enable: maa_rg_enable.value ? 1 : 0,
      maa_weekly_plan: maa_weekly_plan.value,
      mail_enable: mail_enable.value ? 1 : 0,
      package_type: package_type.value == 'official' ? 1 : 0,
      pass_code: pass_code.value,
      planFile: plan_file.value,
      reload_room: reload_room.value.join(','),
      run_mode: run_mode.value == 'orders_only' ? 2 : 1,
      run_order_delay: parseInt(run_order_delay.value),
      start_automatically: start_automatically.value
    }
  }

  watch(
    [
      adb,
      drone_count_limit,
      drone_room,
      enable_party,
      free_blacklist,
      maa_adb_path,
      maa_enable,
      maa_path,
      maa_weekly_plan,
      maa_rg_enable,
      mail_enable,
      account,
      pass_code,
      package_type,
      reload_room,
      run_mode,
      run_order_delay,
      start_automatically
    ],
    () => {
      axios.post(`${import.meta.env.VITE_HTTP_URL}/conf`, build_config())
    }
  )

  return {
    adb,
    load_config,
    drone_count_limit,
    drone_room,
    enable_party,
    free_blacklist,
    maa_adb_path,
    maa_enable,
    maa_path,
    maa_rg_enable,
    maa_weekly_plan,
    mail_enable,
    account,
    pass_code,
    package_type,
    plan_file,
    reload_room,
    run_mode,
    run_order_delay,
    start_automatically,
    build_config
  }
})
