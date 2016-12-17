/**
 * City Accelerator Website
 * 
 * MainNav page Model
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
var MainNav = new keystone.List('MainNav', 
	{
		label: 'Main Navigation',
		singular: 'Main Navigation',
		track: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main MainNav
 */
MainNav.add({
	name: { type: String, default: "Nav Title", label: 'Navigation Title Text', hidden: true, required: true, initial: true },
	mainLink: { 
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Home Page Link', 
		many: false
	},
	description: { type: Types.Markdown, label: "Description",  initial: true, required: true },
	links: { 
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Links', 
		many: true, 
		note: 'Order is important!'
	}, 
	logo: {
		type: Types.Relationship, 
		ref: 'Image', 
		label: 'Logo', 
		many: false
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Methods
 * =============
 */
// Remove a link or image reference if removed from database
MainNav.schema.statics.removeRef = function(refId, callback) {

    MainNav.model.update({
            $or: [{
                'logo': refId
            }, {
                'links': refId
            }]
        },

        {
            $pull: {
                'logo': refId,
                'links': refId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Model Registration
 */
MainNav.defaultSort = '-createdAt';
MainNav.defaultColumns = 'name, updatedAt';
MainNav.register();
