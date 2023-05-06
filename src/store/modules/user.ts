import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: () => ({
      balance: 0,
      account: '',
      loginMethod:'',
      address: null,
      connector: null as any,
      ethExchangePrice: null,
      aprRate: null,
      depositData: null,
      validator: 0,
      maxStep: 1,
      networkList: [],
      walletType: '',
    }),
    getters: {},
    actions: {},
    persist: {
      enabled: true
    }
  },
);
