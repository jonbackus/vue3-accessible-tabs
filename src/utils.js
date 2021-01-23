export const focusable_elements = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]:not([tabindex="-1"])'];

export const get_component_children_from_slot = (slot, component_name) => {
	let children = [];
	let default_slot = slot ? slot() : [];

	default_slot
		.filter(
			node =>
				node.type.name === component_name ||
				(typeof node.type === 'symbol' && node.type.description === 'Fragment'),
		)
		.forEach(node => {
			if (typeof node.type === 'symbol' && node.type.description === 'Fragment') {
				children = children.concat(node.children.filter(vnode => vnode.type.name === component_name));
			} else {
				children.push(node);
			}
		});

	return children;
}