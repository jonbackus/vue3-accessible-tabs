import { defineComponent, h, inject, ref, onMounted, watch } from 'vue';
import { focusable_elements } from '@/utils';

export default defineComponent({
	name: 'tab-panel',

	props: {
		index: { type: Number, required: true },
	},

	setup(props, { slots, attrs }) {
		const active_index = inject('active_index', ref(0));
		const instance_id = inject('instance_id', ref(0));
		const panel_ref = ref();

		const set_negative_tabindex_on_focusable_children = () => {
			const focusable_elements_in_panel = panel_ref.value.querySelectorAll(focusable_elements);

			Array.from(focusable_elements_in_panel).forEach(el => el.setAttribute('tabindex', '-1'));
		};

		const restore_tabindex_on_focusable_children = () => {
			const previously_focusable_elements_in_panel = panel_ref.value.querySelectorAll('[tabindex="-1"]');

			Array.from(previously_focusable_elements_in_panel).forEach(el => el.setAttribute('tabindex', '0'));
		};

		onMounted(() => {
			if (active_index.value !== props.index && panel_ref.value) {
				set_negative_tabindex_on_focusable_children();
			}
		});

		watch(
			() => active_index.value,
			(newval, oldval) => {
				if (newval === props.index) {
					restore_tabindex_on_focusable_children();
				} else if (oldval == props.index) {
					set_negative_tabindex_on_focusable_children();
				}
			},
		);

		return () => {
			const is_active = active_index.value === props.index;

			return h(
				'div',
				{
					...attrs,
					'aria-labelledby': `${instance_id}-${props.index}`,
					class: 'tabs__panel',
					hidden: !is_active,
					id: `${instance_id}-${props.index}-panel`,
					ref: panel_ref,
					role: 'tabpanel',
					tabindex: is_active ? 0 : -1,
				},
				slots.default ? slots.default({ is_active: is_active }) : [],
			);
		};
	},
});
