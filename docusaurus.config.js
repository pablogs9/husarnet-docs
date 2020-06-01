module.exports = {
  title: 'Husarnet',
  tagline: 'Low latency, lightweight, privacy preserving P2P VPN.',
  url: 'https://docs.husarnet.com',
  baseUrl: '/',
  favicon: 'img/favicon-96x96.png',
  organizationName: 'husarnet', // Usually your GitHub org/user name.
  projectName: 'husarnet-docs', // Usually your repo name.
  
  plugins: ['@docusaurus/plugin-google-analytics'],
  
  themeConfig: {
    disableDarkMode: false,

    googleAnalytics: {
      trackingID: 'UA-51095182-4',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    // announcementBar: {
    //   id: 'support_us', // Any value that will identify this message
    //   content:
    //     'We are looking to revamp our docs, please fill <a target="_blank" rel="noopener noreferrer" href="#">this survey</a>',
    //   backgroundColor: '#fafbfc', // Defaults to `#fff`
    //   textColor: '#091E42', // Defaults to `#000`
    // },

    //https://v2.docusaurus.io/docs/theme-classic/#theme
    prism: {
      defaultLanguage: 'bash',  //https://prismjs.com/#supported-languages
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },

    navbar: {
      title: 'husarnet DOCS',
      logo: {
        alt: 'Husarnet',
        src: 'img/husarnet_signet.svg',
        href: '/',
      },
      links: [
        {
          href: 'https://husarnet.com',
          label: 'Exit Docs',
          position: 'left',
        },      
        {
          to: 'docs/begin-linux',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },  
        /*{to: 'blog', label: 'Blog', position: 'left'},
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
        },*/
        {
          href: 'https://github.com/husarnet/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Company',
          items: [
            {
              label: 'Pricing',
              to: 'http://upload.pureinteractive.pl/husarnet/pricing.html',
            },
            {
              label: 'About Us',
              to: 'https://husarnet.com',
            },
            {
              label: 'Terms Of Service',
              to: 'https://app.husarnet.com/tos',
            },
            {
              label: 'License Agreement',
              to: 'https://app.husarnet.com/tos',
            },
            /*{
              label: 'Blog',
              to: '/blog',
            },*/
            
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Documentation',
              href: '/',
            },
            {
              label: 'Community Forum',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Husarnet Dashboard',
              href: 'https://app.husarnet.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/husarnet',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/husarnet',
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
