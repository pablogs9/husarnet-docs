---
sidebar_label: General Technical Info
title: Description of Husarnet
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/manual-general
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

## Introduction

Husarnet is a global P2P network layer dedicated especially for robotic and IoT use cases with first class ROS support. It can be used however in much wider area such as automotive industry (V2V/V2X), and connecting distributed, critical resources like is Smart Grid. It can be used in typical use cases for VPN networks as well.

Thanks to Husarnet you can connect your robots, servers, laptops and even microcontrollers to a single network that is independent from any external infrastructure. All traffic goes directly between your devices.

## Architecture

### Common solutions

Standard solution for connecting devices over Internet uses client-server architecture. All devices connected over the internet can communicate to each other only over the central server.

This architecture seems to be simple, but you have to be aware of its drawbacks. From an user point of view:

- users can be spied by the service provider,
- devices will cease to work when the service provider stops supporting the servers,
- devices need internet access to function, LAN connectivity doesn't suffice,
- larger latency in communication between elements connected to the system,
- if your infrastructure is self-hosted you need to maintain a central server for which requirements for RAM and vCPU's are growing rapidly while you scale your network. 

### Solution provided by Husarnet

Husarnet solves these problems by having a peer-to-peer architecture. Central server (**Husarnet Base**) only helps in establishing connections over the Internet. LAN connections may be established without any Internet access.

Husarnet, in it's core, is one big, automatically routed, IPv6 network. Running Husarnet daemon creates a virtual network interface (`hnet0`) with an unique Husarnet IPv6 address and associated `fc94::/16` route. If the permission system is disabled, any node can reach any other on its IPv6 `fc94:...` address.

The nodes are identified by their 112-bit IPv6 addresses. The IPv6 address is based on hash of the node public key. All connections are also authenticated by the IPv6 address. This property makes it possible to establish connection authenticity without any trusted third party, basing only on the IPv6 address! The connections are also always encrypted.

## Whitelisting and hostnames

As it has beed noted in the previous section, all Husarnet nodes are in the same IPv6 network. Obviously, for security reasons, we need to limit who can connect to whom. Husarnet, by default, accepts connections only to nodes that are on its **whitelist**. Whitelist is simply a list of IPv6 addresses that are allowed to connect to your node (remember that the addresses are also cryptographic identifiers).

The whitelist can be managed either [manually](/docs/manual-client#managing-husarnet-client-manually) or via Websetup protocol. The Websetup protocol is used by the **Husarnet Dashboard**, which is a hosted service for managing Husarnet networks. The Websetup protocol is very simple - the Dashboard sends an UDP message over Husarnet containg the requested changes (e.g. `whitelist-add` or `whitelist-rm`). The message is authenticated with a shared secret and a separate IPv6 whitelist.

For convenience, Husarnet also includes simple (but robust) hostname management system - it has support for editing `/etc/hosts`. Hostnames can again be managed manually or via Websetup protocol. Husarnet Dashboard by default adds hostnames for all devices in the joined Husarnet network.

## How connections are established?

1. First, the **Husarnet Client** connects to the **Husarnet Base Server** (via TCP on port 443 and optionally UDP on port 5582) hosted by Husarnet company. Husarnet company runs multiple geographically distributed **Husarnet Base Servers**.
2. Initially the encrypted data is tunnelled via the **Husarnet Base Server**.
3. The devices attempt to connect to local IP addresses (retrieved via the Base Server). This will succeed if they are in the same network or one of them has public IP address (and UDP is not blocked).
4. The devices attempt to perform NAT traversal assisted by the Base Server. This will succeed if NAT is not symmetric and UDP is not blocked on the firewall.
5. The devices send multicast discovery to the local network. This will succeed if the devices are on the same network (even if there is no internet connectivity or the Base Server can't be reached).

## Husarnet security

Security was of an uttermost importance when designing Husarnet.

Cryptography: Husarnet uses X25519 from libsodium for key exchange, with ephemeral Curve25519 keys for forward secrecy. The hash of initial public key is validated to match the IPv6 address. The packets are encrypted using libsodium ChaCha20-Poly1305 secretbox construction with a random 192-bit nonce.

Runtime safety: Husarnet is written in C++ using modern memory-safe constructs. Linux version drops all capabilities after initializing. It retains access to `/etc/hosts` and `/etc/hostname` via a helper process.

If Husarnet instance is not connected to the Husarnet Dashboard, the whitelist and `/etc/hosts` can only be changed by a local root user. Otherwise, the owner of the Husarnet Dashboard account can also influence the configuration by adding the device to networks.
