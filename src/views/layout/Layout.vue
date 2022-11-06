<template>
	<div class="app-wrapper">
		<header-container />
		<main class="main-container">
			<router-view />
		</main>
		<footer-container />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HeaderContainer from './components/header/Header.vue'
import FooterContainer from './components/footer/Footer.vue'

</script>
<style>
	.main-container {


	}
</style>
