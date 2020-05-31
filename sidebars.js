module.exports = {
  testSidebar: {
    Docusaurus: ['test/doc1', 'test/doc2', 'test/doc3'],
    Features: ['test/mdx'],
  },
  oldSidebar: {
    'Install Husarnet':['old/install-linux', 'old/install-esp32', 'old/install-windows', 'old/install-android'],
    'Using Husarnet':['old/getting-started','old/manual-mgmt','old/problems'],
    'Husarnet & ROS':['old/getting-started-ros','old/ros-security'],
    'How it works':['old/info'],
  },
  docsSidebar: {
    'Getting started':['begin-linux', 'begin-esp32'],
    'Manuals':['manual-general','manual-client','manual-dashboard', 'manual-selfhosted'],
    'Tutorials':['tutorial-ros1','tutorial-ros2','tutorial-troubleshooting'/*,'tutorial-esp32-ota'*/],
  }
};
