import { defineComponent, h, provide, ref, watch } from 'vue';
import { get_component_children_from_slot } from '@/utils';

export default defineComponent({
	props: {
		modelValue: { type: Number, required: false, default: 0 },
		id: { type: String, required: false, default: undefined },
		activeClass: { type: String, required: false, default: 'is-active' },
		disabledClass: { type: String, required: false, default: 'is-disabled' },
		// headerTag: { type: String, required: false, default: 'h3' },
	},

	setup(props, { slots, emit, attrs }) {
		const active_index = ref(props.modelValue || 0);
		provide('active_index', active_index);
		provide('set_active_index', index => (active_index.value = index));

		const number_of_tabs = ref(0);
		provide('number_of_tabs', number_of_tabs);

		provide('instance_id', props.id || `tabs-${Math.floor(Math.random() * 100000)}`);
		provide('active_class', ref(props.activeClass));
		provide('disabled_class', ref(props.disabledClass));

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
