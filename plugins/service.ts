import Vue from 'vue'
import DashboardService from '~/pages/dashboard/dashboard.service'

import UserService from '~/services/user.service'
import RoleService from '~/services/role.service'
import MenuService from '~/services/menu.service'
import PostIgService from '~/services/postig.service'
import ProfileService from '~/pages/pengaturan/profile/profile.service'

declare module 'vue/types/vue' {
  interface Vue {
    $dashboardService(): DashboardService
    // Master
    
    // Pengaturan
    $userService(): UserService
    $roleService(): RoleService
    $menuService(): MenuService
    $postIgService(): PostIgService
    
    $profileService(): ProfileService
  }
}

Vue.prototype.$dashboardService = () => {
  return new DashboardService()
}
// Master




// Pengaturan
Vue.prototype.$userService = () => {
  return new UserService()
}
Vue.prototype.$menuService = () => {
  return new MenuService()
}
Vue.prototype.$roleService = () => {
  return new RoleService()
}
Vue.prototype.$postIgService = () => {
  return new PostIgService()
}



//profile
Vue.prototype.$profileService = () => {
  return new ProfileService()
}