import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import { useStore } from 'vuex'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: UserDashboard },
  { path: '/admin/dashboard', component: AdminDashboard, meta: {requiresRole: 1}, }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if(to.meta.requiresRole){

    const store = useStore();

    const requiredRole = to.meta.requiresRole;

    const fetchh = await fetch('http://localhost:7070/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
            });
            try {
                const userData = await fetchh.json();
                await store.dispatch('setAuth', true);
                await store.dispatch('setUserRole', userData.roleId);
                console.log(`roleId: ${userData.roleId}, required: ${requiredRole}, from storage: ${store.getters.getUserRole}`);

                if(userData.roleId == requiredRole){
                  next();
                } else {
                  next('/dashboard');
                }

                
            } catch(e) {
                console.error('whoops');
            }
  } else {
    next();
  }
});

export default router
