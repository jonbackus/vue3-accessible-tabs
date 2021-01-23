<template>
	<tabs class="my-tabs">
		<tab-list :label="'Schedule'">
			<tab id="events">Events</tab>
			<tab :disabled="true" id="results">Results</tab>
			<tab :tag="'a'" href="/calendar.aspx" class="text-decoration-none">Composite</tab>
		</tab-list>

		<tab-panel> events events events <a href="#">Focusable el</a></tab-panel>
		<tab-panel>results results results <a href="#">Different focusable el</a></tab-panel>
		<tab-panel></tab-panel>
	</tabs>

	<tabs :active-class="'is-active bg-blue-700 text-white'" class="border border-gray-300 p-4">
		<tab-list :label="'Upcoming and Recent Games'" class="flex space-x-2 mb-8">
			<tab :tag="'button'" class="p-2 border-b-2 border-blue-700">Events</tab>
			<tab :tag="'button'" class="p-2 border-b-2 border-blue-700">Results</tab>
			<tab
				:tag="'button'"
				:disabled="true"
				:disabled-class="'bg-gray-400'"
				id="results"
				class="p-2 border-b-2 border-blue-700"
				>Disabled</tab
			>
			<tab :tag="'button'" id="results" class="p-2 border-b-2 border-blue-700">Something Else</tab>
		</tab-list>

		<tab-panel><i>Content of events panel</i></tab-panel>
		<tab-panel><i>Content of results panel</i></tab-panel>
		<tab-panel><i>Content of disabled panel</i></tab-panel>
		<tab-panel><i>Content of something else panel</i></tab-panel>
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
