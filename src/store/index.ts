import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const address = ref('')
    const currentToken = ref({
      id: 1,
      name: 'ETH',
      avatar: 'https://file.test.fxwallet.com/token/1d2919da47a22324eb83f8a7c92eaf1b23c53f3a8faafc1e429560f688a2bbdd.svg',
      address:'',
      token:'ETH'
    })
    const wallets = ref()
    return { address, currentToken, wallets }
  }
)