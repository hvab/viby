const config = {
  dest: 'dist',
  blocks: 'blocks',
  bundles: 'bundles',
  assets: 'assets',
  templates: 'templates',
  pages: 'pages',
  builder: {
    levels: ['blocks'],
    techMap: {
      css: ['post.css', 'css'],
      js: ['js'],
      image: ['jpg', 'png', 'svg'],
    },
  },
};

module.exports = config;
