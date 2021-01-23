import { defineComponent, h } from 'vue';
import { get_component_children_from_slot } from '@/utils';

export default defineComponent({
	name: 'tab-list',

	props: {
		label: { type: String, required: true, default: 'Tabs' },
	},

	setup(props, { slots, attrs }) {
		return () => {
			const tab_children = get_component_children_from_slot(slots.default, 'tab');

			return h(
				'ul',
				{
					...attrs,
					'aria-label': props.label,
					class: 'tabs__list',
					role: 'tablist',
				},
				tab_children.map((child, child_index) => {
					return h(
						'li',
						{ role: 'presentation' },
						h(child, { index: child_index, 'data-index': child_index }),
					);
				}),
			);
		};
	},
});
