<template>
    <div class="text-center">
        <h1 class="text-2xl font-bold">Stake Ether</h1>
        <div>Stake ETH and receive stETH while staking.</div>
        <div class="flex justify-center mt-6">
            <div class="card w-125 bg-base-100 shadow-xl">
                <div class="card-body">
                    <base-input placeholder="Amount" class="" />
                    <button class="btn w-full my-4">Connect Wallet</button>
                    <div class="flex justify-between">
                        <div class="text-gray-500">You will receive</div>
                        <div>0 stETH</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">Exchange rate</div>
                        <div>1 ETH = 1 dxETH</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">Transaction cost</div>
                        <div>$1.61</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">Reward fee</div>
                        <div>10%</div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- sub-title -->
        <div class="flex justify-center mt-12">
            <div class="w-125">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-bold">DX statistics</h2>
                    <div class="text-sm text-blue-400">View on Etherscan</div>
                </div>
               
            </div>
        </div>
        <!-- second-card -->
        <div class="flex justify-center mt-6">
            <div class="card w-125 bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex justify-between">
                        <div class="text-gray-500">Annual percentage rate</div>
                        <div class="text-green-400">5.4%</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">Total staked with DX</div>
                        <div>4,690,316.299 ETH</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">Stakers</div>
                        <div>122328</div>
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-500">dxETH market cap</div>
                        <div>$7,593,361,819</div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- sub-title-faq -->
        <div class="flex justify-center mt-12">
            <div class="w-125 flex justify-start">
                <h2 class="text-xl font-bold">FAQ</h2>
            </div>
        </div>
      
    </div>

</template>
<script lang="ts" setup>
    import BaseInput from '@/components/Input.vue'
</script>