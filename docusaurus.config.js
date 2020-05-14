module.exports = {
  title: 'Husarnet Docs',
  tagline: 'Husarnet documentation',
  url: 'https://docs.husarnet.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'husarnet', // Usually your GitHub org/user name.
  projectName: 'husarnet-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'husarnet DOCS',
      logo: {
        alt: 'Husarnet',
        src: 'img/husarnet_signet.svg',
      },
      links: [        
        {
          to: 'docs/install-linux',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          to: 'docs/test/doc1',
          activeBasePath: 'docs/test',
          label: 'Test',
          position: 'left',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Test',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/test/doc1',
            },
            {
              label: 'Second Doc',
              to: 'docs/test/doc2',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
