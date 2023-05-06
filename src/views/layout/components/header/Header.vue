<template>
  <div class="shadow-sm shadow-slate-100">
    <div class="max-w-screen-xl px-8 mx-auto">
      <header class="flex justify-between items-center py-4 md:py-4">
        <div class="flex items-center">
          <!-- logo -->
          <a href="/" class="flex items-center text-black-800 text-xl font-medium gap-2.5" aria-label="logo">
            <img src="../../../../assets/logo.png" alt="logo" class="w-8 block img-container">
            <span class="logo-title">dapp-starter</span>
          </a>
        </div>
        <!-- connect button -->
        <div class="flex items-center" v-if="!state.isDapp">
          <network-list />
          <button v-if="wallets.length > 0" @click="show = true" class="btn btn-sm btn-info border-none ml-4 h-9 w-36 hover:bg-[#0099cc] text-white">{{ cutString(state.address,4,6) }}</button>
          <button v-else @click="connect" class="btn btn-sm btn-info border-none ml-4 h-9 w-36 hover:bg-[#0099cc] text-white">Connect</button>
        </div>
        <div v-else class="btn btn-sm btn-info border-none ml-4 h-9 w-36 hover:bg-[#0099cc] text-white">{{ cutString(state.address,4,6) }}</div>
        
        <!-- account center -->
        <div aria-live="assertive" class="z-20 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 mt-12">
          <div class="flex w-full flex-col items-center space-y-4 sm:items-end">

            <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
              <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div class="p-4">
                  <div class="flex items-start">
                    
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                      <h1 class="text-xl font-semibold text-gray-900">Account</h1>
                      <div class="mt-4 text-sm text-gray-500">Connected Wallet Address</div>
                      <p class="text-sm font-semibold text-gray-500 mt-2 flex items-center">
                        {{ cutString(state.address,4,6) }}
                        <span class="ml-2 cursor-pointer copy" :data-clipboard-text="state.address" @click="copy">
                          <DocumentDuplicateIcon class="h-5 w-5" />
                        </span>
                      </p>
                      <div class="text-sm my-4 flex items-center cursor-pointer" @click="goExplore">
                        View on explorer
                        <span><ArrowTopRightOnSquareIcon class="w-5 h-5 ml-2" /></span>
                      </div>
                    </div>
                    <div class="ml-4 flex cursor-pointer">
                      <XMarkIcon class="h-5 w-5" aria-hidden="true" @click="show = false" />
                    </div>
                  </div>
                  <button class="btn btn-sm btn-info text-white w-full" @click="onDisconnect">Disconnect</button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { useOnboard, init } from '@web3-onboard/vue'
import { cutString } from '@/common'
import { ethers } from 'ethers'
import { useUserStore } from "@/store/modules/user"
import { XMarkIcon, DocumentDuplicateIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid'

import WalletConnect from "@walletconnect/client"
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import EthIcon from '../../../../assets/logo.png'
import Clipboard from 'clipboard'
import NetworkList from './NetworkList.vue'

let signer: ethers.providers.Provider | ethers.Signer | undefined
let provider: any
if (typeof window.ethereum !== 'undefined') {
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum)
  } catch (e) {
    console.error('Cannot initialize Web3Provider', e);
  }
} else {
  console.error('Web3Provider not available');
}
const store = useUserStore()
const walletConnect = walletConnectModule({
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  },
  connectFirstChainId: true,
})

const injected = injectedModule()
const infuraKey = '6abb27120bfc49fc9081be895d20b382'
const walletList = [injected, walletConnect]

const web3Onboard = init({
  wallets: walletList,
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${infuraKey}`
    },
    {
      id: '0x5',
      token: 'GoerliETH',
      label: 'Goerli',
      rpcUrl:`https://goerli.infura.io/v3/${infuraKey}`
    }
  ],
  appMetadata: {
    name: 'Batch Send',
    description: 'Batch Send',
    icon: EthIcon
  }
})

const { connectWallet, disconnectConnectedWallet, wallets, connectedWallet } = useOnboard()

const state = reactive({
  isActive:false,
  isDapp: false,
  address:''
})
const { proxy } = getCurrentInstance() as any
const show = ref(false)

const connect = async () => {
  await connectWallet()
  if(wallets.value.length > 0){
    state.isActive = true
  }
  store.account = wallets.value
  // get address
  await getSigner()

}

const onDisconnect = () => {
  show.value = false
  store.account = ''
  disconnectConnectedWallet()
}

const getSigner = async() => {
  const data = JSON.parse(localStorage.getItem('alreadyConnectedWallets') as any)
  
  if(!connectedWallet.value && data[0] === 'WalletConnect') {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      clientMeta:{
        description:'dapp-starter',
        url:'',
        icons:['https://file.test.fxwallet.com/1673257212883-logo.png'],
        name:'dapp-starter',
      }
    });
    if (connector.connected) {
      const { accounts } = connector;
      state.address = accounts[0]
      store.account = accounts[0]
    }
  }

  if(connectedWallet.value?.label === 'WalletConnect') {
    const walletConnectProvider = new ethers.providers.Web3Provider(connectedWallet.value?.provider)
    signer = walletConnectProvider.getSigner()
    state.address = await signer?.getAddress()
    store.account = state.address
  } else {
    // if not walletconnect
    if (typeof window.ethereum !== 'undefined') {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // 获取当前账户地址
      signer.getAddress().then((address: any) => {
        state.address = address
        store.account = state.address
      });
    } else {
      // 提示用户安装 MetaMask 或其他支持 Web3Provider 的插件
      console.error('Please install MetaMask or other Web3Provider-enabled browser extension.');
    }
  }
}

const goExplore = () => {
  window.open(`https://goerli.etherscan.io/address/${state.address}`)
}

const copy = () => {
  let clipboard = new Clipboard('.copy')
  clipboard.on('success', (e: any) => {      
    proxy.$message({ type:'success', str: 'Copy successfully' })
    // release
    clipboard.destroy()
  })
  clipboard.on('error', (e: any) => {
    console.log('copy not support', e)
    clipboard.destroy()
  })
}

const loadApp = async() => {
  if(!window.web3?.currentProvider?.isInject) {
    // get address and signer
    await getSigner()
    state.isDapp = false
  } else{
    state.isDapp = true
    let result = await window?.web3?.currentProvider.request({ method:'eth_chainId' })
    if(result) {
      let account = await window?.web3?.currentProvider.request({ method:'eth_accounts' })
      state.address = account[0]
    }
  }
}

onMounted(() => {
  loadApp()
})

</script>
<style scoped>
</style>
