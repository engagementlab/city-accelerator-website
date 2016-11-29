/**
 * City Accelerator Website
 * 
 * Footer page Model
 * @module index
 * @class index
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * index model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Footer = new keystone.List('Footer', 
	{
		label: 'Footer Page',
		singular: 'Footer Page',
		track: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Footer
 */
Footer.add({
	name: { type: String, default: "Footer", hidden: true, required: true, initial: true },
	description: { type: Types.Markdown, label: "Description",  initial: true, required: true },
	links: { 
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Footer Links',
		many: true, 
		note: 'Order is important'
	}, 
	images: {
		type: Types.Relationship, 
		ref: 'Image', 
		label: 'Footer Images',
		many: true
	}
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Footer.defaultSort = '-createdAt';
Footer.defaultColumns = 'name, updatedAt';
Footer.register();
