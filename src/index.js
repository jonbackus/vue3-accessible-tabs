import Tabs from './tabs';
import TabList from './tab-list';
import TabPanel from './tab-panel';
import Tab from './tab';

export default {
	install(app, options = {}) {
		app.provide('$vue3_accessible_tabs', {
			tab_movement: options.tab_movement !== undefined ? !!options.tab_movement : false,
			active_class: options.active_class || 'is-active',
			disabled_class: options.disabled_class || 'is-disabled',
			hash_change: options.hash_change !== undefined ? !!options.hash_change : false,
		});

		app.component('tabs', Tabs);
		app.component('tab-list', TabList);
		app.component('tab', Tab);
		app.component('tab-panel', TabPanel);
	},
};
