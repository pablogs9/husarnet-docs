---
title: 'Husarnet'
layout: default
---

# Managing Husarnet manually

**Warning: this is not the recommended method of using Husarnet.**

Sometimes managing the devices via Husarnet Dashboard can be cumbersome. You can skip connecting your device to the cloud and manage whitelist and hostnames via command line.

If not the whitelist, you could reach any device connected to Husarnet without any configuration. If that suits you, simply disable it on all devices - `husarnet whitelist disable`. Be aware of security implications of this action (e.g. do this only if you are confident that your firewall is strong enough).

Otherwise, whitelist has to contain IP addresses of the devices that are authorized to connect to your host. You can manage it using two commands:

- `$ husarnet whitelist add [address]` - Add fc94 IP address to the whitelist.
- `$ husarnet whitelist rm [address]` - Remove fc94 IP address from the whitelist.

If you want A to communicate with B, make sure to add A to B whitelist and B to A whitelist.
