---
sidebar_label: Using Husarnet & ROS 2
title: Using Husarnet & ROS 2
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/tutorial-ros2
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

## Husarnet and DDS Implementation

Both ROS 1 and ROS 2 allow you to run nodes on different physical machines as long as they are in the same LAN network. In order to run ROS on robotic systems distributed over multiple networks, VPN needs to be used. Husarnet is a peer-to-peer, low-latency and lightweight VPN designed to address robotics applications. In this short guide we will show how to configure ROS 2 to make it work with Husarnet VPN client.

To use Husarnet with DDS some preconfiguration is needed. The specific configuration depends on which DDS implementation is used, but generally peers from Husarnet should be added to an XML configuration file. Below we provide a demonstration of how to use Husarnet running on top of ROS 2, with [Fast DDS](https://fast-dds.docs.eprosima.com/en/latest/) as the underlying middleware. 

### Install Husarnet:

Execute this command on each physical device you need to connect.
```
curl https://install.husarnet.com/install.sh | sudo bash
```
Remember to run `sudo systemctl restart husarnet` after the installation process is complete.

### Configure husarnet network:

Add your physical devices to the same Husarnet network, by executing the following command on each of them:

`husarnet join <your-join-code> <mydevice-hostname>`

<div><center>
<img alt="" src="/docs/assets/img/husarnet-cyclone-dds/join-code.png" width="900px" />
</center></div>

Find more information at: [Husarnet](https://docs.husarnet.com/).

## Husarnet and ROS 2

Create a Fast DDS configuration file in your ROS 2 workspace: `~/ros2_ws/fastdds_husarnet.xml`

To make the communication work, you have to set some parameters as shown in the following template.

**IMPORTANT**: Provide **all** peers under `initialPeersList` tag.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<profiles xmlns="http://www.eprosima.com/XMLSchemas/fastRTPS_Profiles">
    <transport_descriptors>
        <transport_descriptor>
            <transport_id>HusarnetTransport</transport_id>
            <type>UDPv6</type>
        </transport_descriptor>
    </transport_descriptors>

    <participant profile_name="CustomHusarnetParticipant" is_default_profile="true">
        <rtps>
            <useBuiltinTransports>false</useBuiltinTransports>
            <userTransports>
                <transport_id>HusarnetTransport</transport_id>
            </userTransports>
            <builtin>
                <metatrafficUnicastLocatorList>
                    <locator>
                        <udpv6>
                            <address>fc94:cbe:b38c:67a:94f2:7811:4d97:4c6d</address>
                            <port>7412</port>
                        </udpv6>
                    </locator>
                </metatrafficUnicastLocatorList>
                <initialPeersList>
                <!-- Repeat this part for each husernet peer -->
                    <locator>
                        <udpv6>
                            <address>[IPV6-address]</address>
                            <port>7412</port>
                        </udpv6>
                    </locator>
                <!-- End repeat -->
                </initialPeersList>
            </builtin>
        </rtps>
    </participant>
</profiles>

```

Set this file as default profile in your `.bashrc` file, so as to use this configuration every time you boot your system. Open a new terminal and execute:

```bash
echo "export FASTRTPS_DEFAULT_PROFILES_FILE=/home/$USER/ros2_ws/fastdds_husarnet.xml" >> ~/.bashrc
. ~/.bashrc
```

Now you will be able to use your default ROS 2 tools with Husarnet:

```bash
# On one node:
ros2 topic pub /test_topic std_msgs/Int32 '{data: 1}'

# On the other node:
ros2 topic echo /test_topic
```
## Using Husarnet with Eclipse Cyclone DDS

### Install Cyclone DDS middleware: 

Default DDS implementation used in ROS2 Dashing is RMW FastRTPS. We will replace that by Eclipse Cyclone DDS, by executing the following commands in the terminal:


#### Build from source:

When using ROS2 Foxy and later you can skip this step and install as a binary package 

```
cd ros2_ws/src
git clone -b dashing-eloquent https://github.com/ros2/rmw_cyclonedds.git
git clone https://github.com/eclipse-cyclonedds/cyclonedds
cd ..
rosdep install --from src -i
colcon build
export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp
```

#### Install: 
In ROS2 later than Dashing you can install as apt package

```
apt install ros-eloquent-rmw-cyclonedds-cpp
or
apt install ros-foxy-rmw-cyclonedds-cpp
```

### Configure Cyclone DDS:

Create communication settings file under this path `~/ros2_ws/src/cyclonedds/cyclonedds.xml`

To make communication work you have to set some params as follows:

You can provide Peer as IPv6 address or hostname from Husarnet. 

**IMPORTANT**: Provide **all** peers <hostnames/IPv6 address>, (chose one) in every machine **remember to use []** .

```
<?xml version="1.0" encoding="UTF-8" ?>
<CycloneDDS xmlns="https://cdds.io/config" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://cdds.io/config https://raw.githubusercontent.com/eclipse-cyclonedds/cyclonedds/master/etc/cyclonedds.xsd">
    <Domain id="any">
        <General>
            <NetworkInterfaceAddress>auto</NetworkInterfaceAddress>
            <AllowMulticast>false</AllowMulticast>
            <MaxMessageSize>65500B</MaxMessageSize>
        <FragmentSize>4000B</FragmentSize>
        <Transport>udp6</Transport>
        </General>
    <Discovery>
        <Peers>
            <Peer address="[IPV6-address]"/> <!-- example: <Peer address="[fc94:dd2c:a2e6:d645:1a36:****:****:****]"/> -->
            <Peer address="[hostname]"/> <!-- example: <Peer address="[my-laptop]"/> -->
        </Peers>
        <ParticipantIndex>auto</ParticipantIndex>
    </Discovery>
        <Internal>
            <Watermarks>
                <WhcHigh>500kB</WhcHigh>
            </Watermarks>
        </Internal>
        <Tracing>
            <Verbosity>severe</Verbosity>
            <OutputFile>stdout</OutputFile>
        </Tracing>
    </Domain>
</CycloneDDS>
```

Important fields: 

1. Multicast

`<AllowMulticast>false</AllowMulticast>`

At the time of writing this file multicast is not supported by Husarnet so it's necessary to disable this. Multicast feature will be added soon.

2. Transport Protocol

`<Transport>udp6</Transport>`

It's necessary to use IPv6 but Cyclone doesn't allow to mix IPv4 with IPv6 so every node must communicate over IPv6.

3. IPV6-address

`<Peers><Peer address="[IPV6-address]"/></Peers>`

Here appropriate IP addresses should be filled, you can take this address form Husarnet WebUI. Safe method is to provide address of local IPv6 and remote machines.

<div><center>
<img alt="" src="/docs/assets/img/husarnet-cyclone-dds/ipv6-covered2.png" width="900px" />
</center></div>

If you need information about params check [cyclonedds-manual](https://github.com/eclipse-cyclonedds/cyclonedds/blob/master/docs/manual/config.rst)

## Source changes: 

Add changes to .bashrc file to use that configuration every time you boot your system. Open a new terminal and execute:

`echo "export RMW_IMPLEMENTATION=rmw_cyclonedds_cpp" >> ~/.bashrc`

`echo "export CYCLONEDDS_URI=file:///home/$USER/ros2_ws/src/cyclonedds/cyclonedds.xml" >> ~/.bashrc`

`. ~/.bashrc`


## Verify installation:

Run demo publisher and subscriber:

At the first physical machine execute in the terminal: 

`ros2 run demo_nodes_cpp talker`

And this command at the second: 

`ros2 topic echo /chatter`

<div><center>
<img alt="" src="/docs/assets/img/husarnet-cyclone-dds/results6.png" width="900px" />
</center></div>
