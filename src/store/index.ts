import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';
import piniaPersist from 'pinia-plugin-persist'

const pinia = createPinia();
pinia.use(piniaPersist)

export { useUserStore };
export default pinia;