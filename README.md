# Vue3 Accessible Tabs

A simple tabs component plugin for Vue 3. Follows the [Tabs Design Pattern in WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html) for accessibility best practices automatically built into the plugin.

## Install

```
npm i vue3-accessible-tabs
```

or

```
yarn add vue3-acccessible-tabs
```

## Register as a Global Component

```js
import { createApp } from 'vue';
import App from './App.vue'
import vue3_accessible_accordion from 'vue3-accessible-tabs';

const app = createApp(App)
			.use(vue3_accessible_tabs);
			.mount('#app')
```

## Register Components Individually

```js
import Tabs, TabList, Tab, TabPanel from 'vue3-accessible-tabs';

export default {
	components: {
    	Tabs,
        TabList,
        Tab,
        TabPanel,
    }
}
```

## Example Usage

```html
<tabs>
	<tab-list>
    	<tab>Description</tab>
        <tab>Specifications</tab>
        <tab>Reviews</tab>
    </tab-list>

    <tab-panel>Description tab info</tab-panel>
    <tab-panel>Specifications tab info</tab-panel>
    <tab-panel>Review tab info</tab-panel>
</tabs>
```

## Config

**Plugin Options**

```js
import { createApp } from 'vue';
import App from './App.vue'
import vue3_accessible_accordion from 'vue3-accessible-tabs';

const app = createApp(App)
			.use(vue3_accessible_tabs, {
            	hash_change: false,
                active_class: 'is-active',
                diasbled_classes: 'is-disabled',
                tab_movement: false,
            });
			.mount('#app')
```

| Option         | Type    | Default       | Description                                                      |
| -------------- | ------- | ------------- | ---------------------------------------------------------------- |
| hash_change    | Boolean | false         | Controls whether tabs should use fragments                       |
| active_class   | String  | 'is-active'   | CSS class added to a tab and tab panel when they are active      |
| disabled_class | String  | 'is-disabled' | CSS class added to a tab and tab panel when they are disabled    |
| tab_movement   | Boolean | false         | Controls whether a tab should become active if it receives focus |

## Components

### `<tabs>`

**Props**
| Prop | Type | Default | Required | Description |
| ---------- | ------ | --------- | -------- | ----------- |
| modelValue | Number | 0 | No | Index of the tab that should initially be active |
| id | String | undefined | No | ID to set on the tab panel and be linked to the tab automatically. Will control the fragment being used if the `hash_change` option is true|

**Events**

None

### `<tab-list>`

**Props**
| Prop | Type | Default | Required | Description |
| ----- | ------ | ------- | -------- | ----------- |
| label | String | Tabs | Yes | Value for the `aria-label` attribute to provide a descriptive label of the tab list |

**Events**

None

### `<tab>`

**Props**
| Prop | Type | Default | Required | Description |
| ---- | ---- | ------- | -------- | ----------- |
| tag | String | a | No | HTML tag to wrap around the text of the tab |
| disabled | Boolean | false | No | Controls whether the tab should be disabled or not |
| activeClass | String | is-active | No | CSS class added when the tab is active |
| disabledClass | String | is-disabled | No | CSS class added when the tab is disabled |

**Events**

None

**Scoped Slots**

-   `is-active`

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
