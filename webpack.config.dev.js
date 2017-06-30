var path = require('path');
var glob = require('glob');
var node_modules_dir = path.join(__dirname,'node_modules');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const SOURCE_DIR = 'examples/src/';
const PRODUCT_DIR = 'examples';
const pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');
const pathToReactDOM = path.resolve(node_modules_dir,'react-dom/dist/react-dom.min.js');

const debug = process.env.NODE_ENV !== 'production';

var entries = getEntrys(SOURCE_DIR+'*/*.*');
var chunks = Object.keys(entries.js);
var pages = Object.keys(entries.pages);
var resourcs = Object.keys(entries.resource);
var copyfile_configs = [];

var config = {
    entry: entries.js,
    output: {
        path: path.join(__dirname, PRODUCT_DIR),
        filename: '[name]',
    },
    	externals:{
		'react':'React',
		'React':'React',
		'react-dom':'ReactDOM',
		'ReactDOM':'ReactDOM'
	},
    plugins:[
		debug ? function() {} : new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false
            },
			output:{
				comments:false,
			},
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        }),
	],
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: "jsx-loader",
			}, 
			
			{
				test: /\.eot|ttf|svg|png|gif|woff2?$/,
				loader: 'url',
			},
			{
				test:/\.css$/,
				exclude: /node_modules/,
				loader:'style-loader!css-loader'
			},
		],
		noParse:[pathToReact,pathToReactDOM],
	},
	resolve: {
        alias: {
          'react': pathToReact,
          'React':pathToReact,
          'react-dom':pathToReactDOM,
          'ReactDOM':pathToReactDOM,
        }
   },
}

resourcs.forEach(function(pathname){
		 var copy_conf ={
		 		from:SOURCE_DIR+pathname,
		 		to:pathname,	
		 }
		 copyfile_configs.push(copy_conf);
});

config.plugins.push(new CopyWebpackPlugin(copyfile_configs));

pages.forEach(function(pathname){
	if(pathname.indexOf('.html')===pathname.length-5){
		 var html_conf ={
		 		filename:pathname,
		 		template:SOURCE_DIR+pathname,
		 		inject:'body',
		 		chunks:[pathname.substring(0,pathname.length-5)+'.js'],
		 		hash:false,
		 		minify:{
		 				removeComments: true,
		 				collapseWhitespace:false
		 		}
		 }
		 config.plugins.push(new HtmlWebpackPlugin(html_conf));
	}
});

function getEntrys(globPath) {
    var files = glob.sync(globPath);
    var entries = {js:{},pages:{},resource:{}},entry, dirname, basename, pathname, extname;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        var split = dirname.split('/');
        pathname = path.join(split.slice(2,split.length).join("/"), basename+extname);
        if(extname==='.js'){
        		entries.js[pathname]="./"+entry;
        }else if(extname==='.html'){
        		entries.pages[pathname]="./"+entry;	
        }else{
        		entries.resource[pathname]="./"+entry;	
        }
    }
    return entries;
}

module.exports = config;