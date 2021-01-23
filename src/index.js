import Tabs from './tabs';
import TabList from './tab-list';
import TabPanel from './tab-panel';
import Tab from './tab';

export default {
	install(app) {
		app.component('tabs', Tabs);
		app.component('tab-list', TabList);
		app.component('tab', Tab);
		app.component('tab-panel', TabPanel);
	},
};
