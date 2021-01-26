import { defineComponent, h, inject, onMounted, ref } from 'vue';

export default defineComponent({
	name: 'tab',

	props: {
		index: { type: Number, required: true },
		tag: { type: String, required: false, default: 'a' },
		disabled: { type: Boolean, required: false, default: false },
		activeClass: { type: String, required: false },
		disabledClass: { type: String, required: false },
	},

	setup(props, { slots, attrs }) {
		const active_index = inject('active_index', ref(0));
		const set_active_index = inject('set_active_index');
		const instance_id = inject('instance_id', ref(0));
		const tabs_ref = inject('tabs_ref', ref());
		const number_of_tabs = inject('number_of_tabs', ref(0));
		const current_hash = inject('current_hash', ref(window.location.hash));
		const tab_indexes_and_ids = inject('tab_indexes_and_ids', ref(new Set()));
		const options = inject('$vue3_accessible_tabs', {});

		const active_class = props.activeClass ? ref(props.activeClass) : inject('active_class', ref('is-active'));
		const disabled_class = props.disabledClass
			? ref(props.disabledClass)
			: inject('disabled_class', ref('is-disabled'));

		const href = ref();

		const handle_click = () => {
			if (!href.value.startsWith('#')) {
				return;
			}

			if (active_index.value === props.index || props.disabled) {
				return;
			}

			set_active_index(props.index);
		};

		const get_enabled_tabs = () => {
			return Array.from(tabs_ref.value.querySelectorAll(`.tabs__list .tabs__tab[data-disabled="false"]`));
		};

		const get_next_enabled_tab = (starting_index, direction) => {
			let tab = undefined;

			let index_to_check = starting_index + direction;

			if (index_to_check > number_of_tabs.value - 1) {
				index_to_check = 0;
			}

			tab = tabs_ref.value.querySelector(
				`.tabs__list .tabs__tab[data-index="${index_to_check}"][data-disabled="false"]`,
			);

			if (!tab) {
				return get_next_enabled_tab(index_to_check, direction);
			}

			return tab;
		};

		const handle_keydown = event => {
			const keys_to_respond_to = [' ', 'Spacebar', 'Enter', 'Home', 'End', 'ArrowRight', 'ArrowLeft'];

			if (!keys_to_respond_to.includes(event.key)) {
				return;
			}

			const enabled_tabs = get_enabled_tabs();

			if (!enabled_tabs.length > 2) {
				return;
			}

			if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
				handle_click();
				return;
			}

			let new_tab_for_focus = undefined;

			if (event.key === 'Home') {
				event.preventDefault();
				new_tab_for_focus = enabled_tabs[0];
			} else if (event.key === 'End') {
				event.preventDefault();
				new_tab_for_focus = enabled_tabs[enabled_tabs.length - 1];
			} else if (event.key === 'ArrowRight') {
				if (props.index === number_of_tabs - 1) {
					new_tab_for_focus = enabled_tabs[0];
				} else {
					new_tab_for_focus = get_next_enabled_tab(props.index, 1);
				}
			} else if (event.key === 'ArrowLeft') {
				if (props.index === 0) {
					new_tab_for_focus = enabled_tabs[enabled_tabs.length - 1];
				} else {
					new_tab_for_focus = get_next_enabled_tab(props.index, -1);
				}
			}

			if (new_tab_for_focus) {
				new_tab_for_focus.focus();
			}
		};

		const set_href = () => {
			if (attrs.href && !attrs.href.startsWith('#')) {
				href.value = attrs.href;
			}
		};

		onMounted(() => {
			set_href();

			if (current_hash.value === href.value) {
				handle_click();
			}
		});

		return () => {
			const is_active = active_index.value === props.index;

			const tab_panel_id = Array.from(tab_indexes_and_ids.value)
				.filter(pair => pair.index === props.index)
				.map(match => match.id)
				.shift();

			const tabindex = options.tab_movement ? 0 : is_active ? 0 : -1;

			return h(
				props.tag,
				{
					...attrs,
					'aria-controls': tab_panel_id || `${instance_id}-${props.index}`,
					'aria-selected': is_active,
					class: [
						'tabs__tab',
						is_active ? active_class.value : '',
						props.disabled ? disabled_class.value : '',
					]
						.join(' ')
						.trim(),
					disabled: props.disabled,
					'data-disabled': props.disabled,
					href: href.value || `#${tab_panel_id}`,
					id: `${instance_id}-${props.index}-tab`,
					tabindex: tabindex,
					onClick: handle_click,
					onKeydown: handle_keydown,
				},
				slots.default ? slots.default({ is_active: is_active }) : [],
			);
		};
	},
});
