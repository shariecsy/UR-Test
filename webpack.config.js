var path = require('path');
var node_modules_dir = path.join(__dirname,'node_modules');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const pathToReact = path.resolve(node_modules_dir, 'react/dist/react.min.js');
const pathToReactDOM = path.resolve(node_modules_dir,'react-dom/dist/react-dom.min.js');
const SOURCE_DIR = './src';
const PRODUCT_DIR = 'dist';
const ENTRY_FILE_NAME = 'index.js';
const LIBRARY_NAME='UcsmyUI';

var common_loaders = [{
		test: /\.css$/,
		exclude: /node_modules/,
		loader: 'style-loader!css-loader'
	},
	{
		test: /\.js?$/, // Match both .js and .jsx files
		exclude: /node_modules/,
		loader: "jsx-loader"
	}
];

//通过src配置项，替换成min的filename，生成min配置项
var getMinConfig = function(conf,filename){
	var min = {};
	for(var key in conf){
		if(key == 'filename'){
			min[key] = filename;
		}else{
			min[key] = conf[key];
		}
	}
	return min;
}

//********CSS*************
var css_config = {
    entry: {
    		'ucs.scss':'./sass/ucs.scss'
    },
    output: {
        path: 'style',
        filename: 'ucs.css'
    },
	plugins:[
		new ExtractTextPlugin("ucs.css")
	],
	module: {
		loaders: [
			 {
				test: /\.eot|ttf|svg|png|gif|woff2?$/,
				exclude: /node_modules/,
				loader: 'url',
				query: {
					limit: 10240,
					name: 'images/[name].[ext]'
				}
			},
			{
				test:/\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract('style', 'css!sass')
			}
		]
	}
}

//********UR*************
var ur_cfg = {
	entry: {
    		ENTRY_FILE_NAME:SOURCE_DIR+'/'+ENTRY_FILE_NAME
    },
    output: {
        path: PRODUCT_DIR,
        filename: 'ucsmy-ui.js',
        libraryTarget: 'umd',
    		library: LIBRARY_NAME
    },
    externals:{
        'react':'React',
        'React':'React',
        'react-dom':'ReactDOM',
        'ReactDOM':'ReactDOM'
    },
    resolve: {
        alias: {
            'react': pathToReact,
            'React':pathToReact,
            'react-dom':pathToReactDOM,
            'ReactDOM':pathToReactDOM
        }
    }
}

var ur_src_config = {
    entry: ur_cfg.entry,
    output: ur_cfg.output,
    externals:ur_cfg.externals,
	module: {
		loaders: common_loaders
	},
    resolve: ur_cfg.resolve
}

var ur_min_config = {
    entry: ur_cfg.entry,
    output: getMinConfig(ur_cfg.output,'ucsmy-ui.min.js'),
    externals:ur_cfg.externals,
    plugins:[
		new UglifyJsPlugin({ //压缩代码
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
			output:{
				comments:false
			},
            except: ['$super', '$', 'exports', 'require'] //排除关键字
        })
	],
	module: {
		loaders: common_loaders
	},
    resolve: ur_cfg.resolve
}

//********U-EVENTHUB*************
var u_eventhub_cfg = {
	entry: {
		'u-eventhub.js': './src/utils/u-eventhub/index.js',
	},
	output:{
		path: PRODUCT_DIR + '/libs',
		filename: 'u-eventhub.js',
		libraryTarget: 'umd',
		library: 'UEventHub'
	}
};

var u_eventhub_src_config = {
	entry: u_eventhub_cfg.entry,
	output:u_eventhub_cfg.output
}

var u_eventhub_min_config = {
	entry: u_eventhub_cfg.entry,
	output: getMinConfig(u_eventhub_cfg.output,'u-eventhub.min.js'),
	plugins: [
		new UglifyJsPlugin({ //压缩代码
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			except: ['$super', '$', 'exports', 'require'] //排除关键字
		})
	]
}

//********U-AJAX*************
var u_ajax_cfg = {
	entry: {
		'u-ajax.js': './src/utils/u-ajax/index.js',
	},
	output: {
		path: PRODUCT_DIR + '/libs',
		filename: 'u-ajax.js',
		libraryTarget: 'umd',
		library: 'UAjax'
	}
};

var u_ajax_src_config = {
	entry: u_ajax_cfg.entry,
	output: u_ajax_cfg.output
}

var u_ajax_min_config = {
	entry: u_ajax_cfg.entry,
	output: getMinConfig(u_ajax_cfg.output,'u-ajax.min.js'),
	plugins: [
		new UglifyJsPlugin({ //压缩代码
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			except: ['$super', '$', 'exports', 'require'] //排除关键字
		})
	]
}

module.exports = [ur_src_config,ur_min_config,
u_eventhub_src_config,u_eventhub_min_config,
u_ajax_src_config,u_ajax_min_config,
css_config];