import { defineComponent, h, provide, ref, watch } from 'vue';
import { get_component_children_from_slot } from '@/utils';

export default defineComponent({
	props: {
		modelValue: { type: Number, required: false, default: 0 },
		id: { type: String, required: false, default: undefined },
	},

	setup(props, { slots, emit, attrs }) {
		const active_index = ref(props.modelValue || 0);
		provide('active_index', active_index);
		provide('set_active_index', index => (active_index.value = index));

		const number_of_tabs = ref(0);
		provide('number_of_tabs', number_of_tabs);

		const tab_indexes_and_ids = ref(new Set());
		provide('tab_indexes_and_ids', tab_indexes_and_ids);

		provide('instance_id', props.id || `tabs-${Math.random().toString(36).substr(2,9)}`);

		const tabs_ref = ref();
		provide('tabs_ref', tabs_ref);

		const current_hash = ref(window.location.hash);
		provide('current_hash', current_hash);

		window.addEventListener('hashchange', () => {
			current_hash.value = window.location.hash;
		});

		watch(
			() => active_index.value,
			(newval, oldval) => {
				if (newval !== oldval && newval !== props.modelValue) {
					emit('update:modelValue', newval);
				}
			},
		);

		watch(
			() => props.modelValue,
			(newval, oldval) => {
				if (newval && oldval && newval !== oldval && newval !== active_index.value) {
					active_index.value = newval;
				}
			},
			{
				immediate: true,
			},
		);

		return () => {
			const tab_list = get_component_children_from_slot(slots.default, 'tab-list').shift();
			const tab_panels = get_component_children_from_slot(slots.default, 'tab-panel');

			number_of_tabs.value = tab_panels.length;

			return h(
				'div',
				{
					...attrs,
					class: 'tabs',
					ref: tabs_ref,
				},
				[
					tab_list,
					...tab_panels.map((child, child_index) =>
						h(child, { index: child_index, 'data-index': child_index }),
					),
				],
			);
		};
	},
});
