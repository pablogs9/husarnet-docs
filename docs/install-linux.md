---
sidebar_label: Linux
title: Install Husarnet on Linux
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/install-linux
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

# Installation using one-command method

The simplest way to install Husarnet is to paste the following line to your terminal:

```
curl https://install.husarnet.com/install.sh | sudo bash
```

That's all. You can now continue to the [getting started](/getting-started/) tutorial.

This method works on APT and Yum based Linux distributions such as Debian, Ubuntu, CentOS, RHEL, Fedora or Mint.

# Other methods

## Setting up the Debian/Ubuntu repository manually

You can also set up the Debian (works for all reasonably new versions of Ubuntu and Debian) repository manually:

```
curl https://install.husarnet.com/key.asc | apt-key add -
echo 'deb https://install.husarnet.com/deb/ all husarnet' > /etc/apt/sources.list.d/husarnet.list
apt-get install -y apt-transport-https
apt-get update
apt-get install -y husarnet
```

## Setting up the Yum repository manually

You can also set up the Yum repository manually:

```
rpm --import https://install.husarnet.com/key.asc
curl https://install.husarnet.com/husarnet.repo > /etc/yum.repos.d/husarnet.repo
yum install -y husarnet
```

## Totally manual binary installation (advanced)

**Warning: this is not the recommended installation method. You won't get automatic software updates this way!**

If your Linux distribution is not supported by the one-command install method, you can also download the binary package. For most seamless experience, it is recommended to unpack it to the root directory (`/`):

```
curl https://install.husarnet.com/tgz/husarnet-latest-amd64.tgz > husarnet-latest-amd64.tgz
sudo tar --directory=/ --no-same-owner --dereference -xf husarnet-latest-amd64.tgz
```

(replace `-amd64` with `-armhf` or `-i386` if you don't have 64-bit Intel/AMD processor)

If you are using systemd, enable and start the service (`systemctl enable husarnet; systemctl start husarnet`). Otherwise, make sure `husarnet daemon` command is started on system startup. You need to run it as root, but don't worry - Husarnet automatically relinquishes unnecessary permissions.
