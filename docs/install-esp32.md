---
sidebar_label: ESP32
title: Use Husarnet on ESP32 microcontroller
---

# Husarnet ESP32 SDK

This article contains information about using Husarnet with ESP32.

## Setting up the SDK

You will need to install ESP-IDF (ESP32 SDK) with a few changes for Husarnet. You can follow the steps below or the detailed instruction on https://docs.espressif.com/projects/esp-idf/en/stable/get-started/ (just be to use https://github.com/husarnet/esp-idf instead of https://github.com/espressif/esp-idf as a SDK repo address).

1. As a first step, download ESP32 toolchain: https://docs.espressif.com/projects/esp-idf/en/stable/get-started/#setup-toolchain

2. Get ESP-IDF:

   ```
   git clone --recursive https://github.com/husarnet/esp-idf ~/apps/husarnet-esp-idf
   ```

   Export the environment variable ESP_IDF:

   ```
   export ESP_IDF=$HOME/apps/husarnet-esp-idf
   ```

3. Build the example:

   ```
   make -j4
   ```

## Using the SDK

There is only one Husarnet-specific call you need to make - `husarnet_websetup_start()`. Make sure it is called after tcpip_adapter_init and nvs_flash_init:

```
ESP_ERROR_CHECK(nvs_flash_init());
tcpip_adapter_init();
husarnet_websetup_start();
```

After that, you may use normal sockets - either via POSIXy `lwip_socket` interface or native netconn lwip API. Make sure use IPv6 sockets, though.

It is also possible to use C++ API - it that case you will need to invoke `Websetup::start()` - see husarnet-esp32-example for more information.

## Examples

 - [esp32-example](https://github.com/husarnet/husarnet-esp32-example) - simples possible demo (uses C++ API)
 - [esp32-cam-demo](https://github.com/husarnet/esp32-cam-demo) - share image from camera connect to the ESP32 over Husarnet
