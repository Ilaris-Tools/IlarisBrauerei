/* eslint-disable max-lines */

const WatercolorGen = require('./snippets/watercolor.gen.js');
const ImageMaskGen  = require('./snippets/imageMask.gen.js');
const dedent        = require('dedent-tabs').default;

module.exports = [

	{
		groupName : 'Text Editor',
		icon      : 'fas fa-pencil-alt',
		view      : 'text',
		snippets  : [
			{
				name : 'Spalten-Umbruch',
				icon : 'fas fa-columns',
				gen  : '\n\\column\n'
			},
			{
				name : 'Neue Seite',
				icon : 'fas fa-file-alt',
				gen  : '\n\\page\n'
			},
			{
				name : 'Querformat',
				icon : 'icon-landscape',
				gen  : '\n{{querformat}}\n'
			},
			
			{
				name : 'Vertikaler Abstand',
				icon : 'fas fa-arrows-alt-v',
				gen  : '\n::::\n'
			},
			{
				name : 'Horizontaler Abstand',
				icon : 'fas fa-arrows-alt-h',
				gen  : ' {{width:100px}} '
			},
			{
				name : 'Breiter Block',
				icon : 'fas fa-window-maximize',
				gen  : dedent`\n
					{{wide
					Everything in here will be extra wide. Tables, text, everything!
					Beware though, CSS columns can behave a bit weird sometimes. You may
					have to manually place column breaks with \`\column\` to make the
					surrounding text flow with this wide block the way you want.
					}}
					\n`
			},
			{
				name : 'Linksbündig',
				icon : 'fas fa-align-left',
				gen  : ' {{linksbuendig Dies steht links}} '
			},
			{
				name : 'Zentriert',
				icon : 'fas fa-align-center',
				gen  : ' {{zentriert Dies steht mittig}} '
			},
			{
				name : 'Rechtsbündig',
				icon : 'fas fa-align-right',
				gen  : ' {{rechtsbuendig Dies steht rechts}} '
			},
			{
				name : 'Link zu URL',
				icon : 'fas fa-link',
				gen  : '[Hier klicken](#p3) um auf Seite 3 zu gehen\n'
			},
			{
				name : 'Kommentar hinzufügen',
				icon : 'fas fa-code',
				gen  : '<!-- Dies ist ein Kommentar, der nicht im Gebräu angezeigt wird. Hotkey (Strg/Cmd + /). -->'
			},
		]
	},
	{
		groupName : 'Style Editor',
		icon      : 'fas fa-pencil-alt',
		view      : 'style',
		snippets  : [
			{
				name : 'Kommentar hinzufügen',
				icon : 'fas fa-code',
				gen  : '/* Dies ist ein Kommentar, der nicht im Gebräu angezeigt wird. */'
			},
		]
	},

	/*********************** IMAGES *******************/
	{
		groupName : 'Grafiken',
		icon      : 'fas fa-images',
		view      : 'text',
		snippets  : [
			{
				name : 'Bild',
				icon : 'fas fa-image',
				gen  : dedent`
					![cat warrior](https://s-media-cache-ak0.pinimg.com/736x/4a/81/79/4a8179462cfdf39054a418efd4cb743e.jpg) {width:325px,mix-blend-mode:multiply}`
			},
			{
				name : 'Hintergrundbild',
				icon : 'fas fa-tree',
				gen  : dedent`
					![homebrew mug](http://i.imgur.com/hMna6G0.png) {position:absolute,top:50px,right:30px,width:280px}`
			},
			{
				name : 'Wasserflecken',
				icon : 'fas fa-fill-drip',
				gen  : WatercolorGen,
			},
			{
				name         : 'Bildklecks Mitte',
				icon         : 'fac mask-center',
				gen          : ImageMaskGen.center,
				experimental : true,
			},
			{
				name         : 'Bildklecks Rand',
				icon         : 'fac mask-edge',
				gen          : ImageMaskGen.edge('bottom'),
				experimental : true,
				subsnippets  : [
					{
						name : 'Oben',
						icon : 'fac position-top',
						gen  : ImageMaskGen.edge('top'),
					},
					{
						name : 'Rechts',
						icon : 'fac position-right',
						gen  : ImageMaskGen.edge('right'),
					},
					{
						name : 'Unten',
						icon : 'fac position-bottom',
						gen  : ImageMaskGen.edge('bottom'),
					},
					{
						name : 'Links',
						icon : 'fac position-left',
						gen  : ImageMaskGen.edge('left'),
					},
				]
			},
			{
				name         : 'Bildklecks Ecke',
				icon         : 'fac mask-corner',
				gen          : ImageMaskGen.corner,
				experimental : true,
				subsnippets  : [
					{
						name : 'Oben links',
						icon : 'fac position-top-left',
						gen  : ImageMaskGen.corner('top', 'left'),
					},
					{
						name : 'Oben rechts',
						icon : 'fac position-top-right',
						gen  : ImageMaskGen.corner('top', 'right'),
					},
					{
						name : 'Unten links',
						icon : 'fac position-bottom-left',
						gen  : ImageMaskGen.corner('bottom', 'left'),
					},
					{
						name : 'Unten rechts',
						icon : 'fac position-bottom-right',
						gen  : ImageMaskGen.corner('bottom', 'right'),
					}
				]
			},
			{
				name : 'Wasserzeichen',
				icon : 'fas fa-id-card',
				gen  : dedent`
				{{watermark Ilaris}}\n`
			},
		]
	},

	/*********************  TABLES *********************/

	{
		groupName : 'Tabellen',
		icon      : 'fas fa-table',
		view      : 'text',
		snippets  : [
		]
	},

	/**************** PAGE *************/

	{
		groupName : 'Druck',
		icon      : 'fas fa-print',
		view      : 'style',
		snippets  : [
			// {
			// 	name : 'A4 Page Size',
			// 	icon : 'far fa-file',
			// 	gen  : dedent`/* A4 Page Size */
			// 		.page{
			// 			width  : 210mm;
			// 			height : 296.8mm;
			// 		}\n\n`
			// },
			{
				name : 'Quadratische Seitengröße',
				icon : 'far fa-file',
				gen  : dedent`/* Square Page Size */
					.page {
						width   : 125mm;
						height  : 125mm;
						padding : 12.5mm;
						columns : unset;
					}\n\n`
			},
			{
				name : 'Toner-schonend',
				icon : 'fas fa-tint',
				gen  : dedent`
					/* Ink Friendly */
					*:is(.page) {
						background : white !important;
						filter : drop-shadow(0px 0px 3px #888) !important;
					}

					.page img {
						visibility : hidden;
					}\n\n`
			},
		]
	}
];
