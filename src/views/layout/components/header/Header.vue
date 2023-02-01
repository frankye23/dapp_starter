<template>
  <header class="w-full px-4">
    <div class="flex justify-between p-4 px-3">
      <nav class="w-full">
        <div class="flex items-center justify-between">
          <router-link to="/" active-class="text-gray-900" class="text-xl text-gray-600">
            <div class="flex space-x-4 items-center">
              <!-- logo -->
              <img class="h-10 min-w-10" src="../../../../assets/logo.png" alt="logo" />
              <p class="hover:text-gray-900">Dapp Starter</p>
            </div>
          </router-link>

          <div class="flex items-center space-x-10">
            <!-- router -->
            <router-link
              v-for="link in navigation"
              :key="link.name"
              :to="link.href"
              active-class="text-gray-900"
              exact
              class="text-gray-600 hover:text-gray-900"
            >
              {{ link.name }}
            </router-link>

            <div v-if="isActivated" class="flex items-center">
              <!-- Account -->
              <div class="sm:hidden py-2 px-3 rounded-2xl inline-block bg-gray-100">
                {{ shortenAddress(address) }}
              </div>

              <div class="hidden sm:flex py-1 px-2 flex items-center rounded-3xl border border-solid">
                <div class="px-1 mr-1">{{ displayEther(balance) }} ETH</div>
                <div class="py-2 px-3 rounded-2xl inline-block bg-gray-100">
                  {{ shortenAddress(address) }}
                </div>
              </div>
            </div>

            <button v-else @click="connect" class="btn">Connect Wallet</button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useBoard, useEthers, useWallet, displayEther, shortenAddress } from 'vue-dapp'
import { init } from '@web3-onboard/vue'
import { useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
const walletConnect = walletConnectModule()

const { open } = useBoard()
const { address, balance, isActivated } = useEthers()
const injected = injectedModule()
const infuraKey = '6abb27120bfc49fc9081be895d20b382'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

const wallets = [injected, walletConnect]

const web3Onboard = init({
  wallets: wallets,
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ]
})

const { connectWallet, disconnectConnectedWallet, connectedWallet } = useOnboard()

if (connectedWallet) {
  // const ethersProvider = new ethers.providers.Web3Provider(connectedWallet.provider, 'any')
  // ..... do stuff with the provider
}
const connect = async () => connectWallet()

const navigation: { name: string; href: string }[] = [
  {
    name: 'stake',
    href: '/stake',
  },
  {
    name: 'reward',
    href: '/reward',
  },
]
</script>
