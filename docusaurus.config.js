module.exports = {
  title: 'Husarnet',
  tagline: 'Low latency, privacy preserving, lightweight VPN.',
  url: 'https://docs.husarnet.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'husarnet', // Usually your GitHub org/user name.
  projectName: 'husarnet-docs', // Usually your repo name.
  themeConfig: {
    disableDarkMode: false,
    // announcementBar: {
    //   id: 'support_us', // Any value that will identify this message
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc', // Defaults to `#fff`
    //   textColor: '#091E42', // Defaults to `#000`
    // },

    //https://v2.docusaurus.io/docs/theme-classic/#theme
    prism: {
      defaultLanguage: 'bash',
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },

    navbar: {
      title: 'husarnet DOCS',
      logo: {
        alt: 'Husarnet',
        src: 'img/husarnet_signet.svg',
      },
      links: [      
        {
          to: 'docs/begin-linux',
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
          to: 'docs/old/install-linux',
          activeBasePath: 'docs/old',
          label: 'Old',
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
      copyright: `Copyright © ${new Date().getFullYear()} Husarnet sp. z o.o.`,
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
  // themes: ['@docusaurus/theme-classic', '@docusaurus/theme-live-codeblock'],
};
