<template>
	Active Tab: {{ active_tab }}
	<tabs class="my-tabs" v-model="active_tab">
		<tab-list :label="'Schedule'">
			<tab>Events</tab>
			<tab>Results</tab>
			<!-- <tab :tag="'a'" href="/calendar.aspx" class="text-decoration-none">Composite</tab> -->
		</tab-list>

		<tab-panel> events events events <a href="#">Focusable el</a></tab-panel>
		<tab-panel id="results">results results results <a href="#">Different focusable el</a></tab-panel>
		<!-- <tab-panel></tab-panel> -->
	</tabs>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'App',

	setup() {
		const active_tab = ref(0);

		return {
			active_tab,
		};
	},
};
</script>
