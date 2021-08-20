/* eslint-disable node/no-unpublished-import, import/no-extraneous-dependencies */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import paths from './paths';

export default {
    entry: {
        index: `${paths.src}/index/scripts/index.ts`,
        gadgetPage: `${paths.src}/gadget-page/scripts/index.ts`,
        addGadget: `${paths.src}/add-gadget/scripts/index.ts`,
    },

    output: {
        path:       paths.build,
        filename:   '[name].bundle.js',
        publicPath: '/',
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from:        paths.public,
                    to:          '.',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),

        new HtmlWebpackPlugin({
            chunks:   ['index'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/index/index.html`,
            filename: 'index.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['gadgetPage'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/gadget-page/index.html`,
            filename: 'gadget-page.html',
        }),

        new HtmlWebpackPlugin({
            chunks:   ['addGadget'],
            favicon:  `${paths.public}/img/favicon.ico`,
            template: `${paths.src}/add-gadget/index.html`,
            filename: 'add-gadget.html',
        }),

        new ESLintPlugin({
            files:     ['.', 'src', 'config'],
            formatter: 'table',
        }),
    ],

    module: {
        rules: [
            {
                test:    /\.ts?$/,
                use:     'ts-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.js$/,
                use:  ['babel-loader'],
            },

            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },

    resolve: {
        modules:    [paths.src, 'node_modules'],
        extensions: ['.js', '.ts', '.json'],
        alias:      {
            '@src': paths.src,
        },
    },
};
