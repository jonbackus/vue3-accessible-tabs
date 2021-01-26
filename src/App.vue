<template>
	<tabs class="my-tabs">
		<tab-list :label="'Schedule'">
			<tab>Events</tab>
			<tab>Results</tab>
			<tab :tag="'a'" href="/calendar.aspx" class="text-decoration-none">Composite</tab>
		</tab-list>

		<tab-panel id="events"> events events events <a href="#">Focusable el</a></tab-panel>
		<tab-panel>results results results <a href="#">Different focusable el</a></tab-panel>
		<tab-panel></tab-panel>
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
