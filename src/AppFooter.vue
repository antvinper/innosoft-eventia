<template>
	<div class="layout-footer">
		<img alt="Logo" :src="LogoInnosoft" height="75" class="mr-2" />
		Herramienta para la gestión de las jornadas
		<span class="font-medium ml-2">InnosoftDevDays</span>
	</div>
</template>

<script>
import LogoInnosoft from "@/assets/LogoInnosoft.png"

export default {
	name: "AppFooter",
	data() {
		return {
			LogoInnosoft: LogoInnosoft,
		}
	}
}

</script>

<style scoped>
	.layout-footer {
		font-size: 16px;
	}
</style>