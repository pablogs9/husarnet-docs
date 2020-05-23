---
sidebar_label: ESP32
title: Use Husarnet on ESP32
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/begin-esp32
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

This quick start guide describes how to use **Husarnet VPN Client** software library on ESP32 Wi-Fi microcontrollers and how to configure a network using **Husarnet Dashboard** in a few easy steps.

## I. Create a network

Log in to [Husarnet Dashboard](https://app.husarnet.com), click **Create network**, name it and click **Create** button.

## II. Get a join code

Click **Add element** button, select **join code** tab and copy your join code that looks like this: 
```
fc94:b01d:1803:8dd8:b293:5c7d:7639:932a/XXXXXXXXXXXXXXXXXXXXX
```

## III. Configure Arduino IDE environment

### 1. Install IDE
First, download and install [Arduino IDE](https://www.arduino.cc/en/Main/Software).

### 2. Add ESP32 boards (powered by Husarnet) 
Open Arduino IDE and install the fork of **Arduino core for the ESP32** by following these steps:
- go to `File -> Preferences`
- in a field `Additional Board Manager URLs` paste this link:
```
https://files.husarion.com/arduino/package_esp32_index.json
```
- go to `Tools -> Board: ... -> Boards Manager ...`
- Search for `esp32-husarnet` by Husarion
- Click install button

### 3. Select ESP32 dev board:

- go to `Tools -> Board`
- select `ESP32 Dev Module` under **ESP32 Arduino (Husarnet)** section

## IV. Demo no. 1 (basic)

We created a "hello world" demo for ESP32 and Husarnet. To run it you will need:
- ESP32 dev board
- laptop running Linux

ESP32 board is sending `Hello world! 1`, `Hello world! 2`, `Hello world! 3` etc. over the internet using Husarnet VPN to a computer with a very basic server written in Python3 and running on 8002 port.

Both client and server code is available on the [GitHub](https://github.com/DominikN/husarnet-esp32-minimal)

### ESP32 client code
Create a new Arduino project **husarnet-esp32-minimal** and paste that code to the **husarnet-esp32-minimal.ino** file (remember to replace `wifi-ssid-1` and `wifi-pass-for-ssid-1` by your Wi-Fi credentials and also replace a joincode by your own obtained in [section II](/docs/begin-esp32#ii-get-a-join-code)):

```cpp
#include <WiFi.h>
#include <Husarnet.h>

// WiFi credentials
const char* ssid     = "wifi-ssid-1";
const char* password = "wifi-pass-for-ssid-1";

// Husarnet credentials
const char* hostName = "esp32basic";
const char* husarnetJoinCode = "fc94:b01d:1803:8dd8:b293:5c7d:7639:932a/xxxxxxxxxxxxxxxxxxxxxx";

// Hostname of your laptop hosting a server
const char* laptopHostname = "mylaptop1";

void setup()
{
  Serial.begin(115200);

  /* Connect to WiFi */
  Serial.printf("Connecting to %s", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.printf("done\r\nlocal IP: %s", WiFi.localIP());

  /* Start Husarnet */
  Husarnet.join(husarnetJoinCode, hostName);
  Husarnet.start();
}

void loop()
{
    HusarnetClient client;
    uint8_t buf[100];
    int buf_s = 0;
    int cnt = 0;

    /* Try to connect to a server on port 8002 on your laptop */
    if (!client.connect(laptopHostname, 8002)) {
        Serial.printf("connection to \"%s\" failed\r\n", laptopHostname);
        delay(1000);
        return;
    }

    /* While connected send "Hello world!" + counter value */
    while(client.connected()) {
      buf_s = sprintf ((char*)buf, "Hello world! %d\r\n", cnt++);
      client.write(buf,buf_s);
      Serial.printf("sending: %s\r\n", (char*)buf);
      delay(1000);
    }
}
```
Then upload the code to ESP32.

### Python server code

First, connect your Linux laptop to the same Husarnet network as ESP32. Follow [this guide](/docs/begin-linux) to see how to install **Husarnet Client** app and connect your laptop to the Husarnet network.

Create a **laptopServer.py** file and paste this code:

```python
import socket

with socket.socket(socket.AF_INET6, socket.SOCK_STREAM) as s:
	s.bind((socket.gethostname(), 8002))
	s.listen(1)
	conn, addr = s.accept()
	with conn:
		print('Connected by', addr)
		while True:
			data = conn.recv(1024)
			if not data: break
			print(data.decode('ascii'))
```
Then open a linux terminal in the same location where the python project is located and execute:

```bash
python3 ./laptopServer.py
```

:::note use IPv6 in your programs
Husarnet runs on top of both IPv4 and IPv6 networks but creates only IPv6 overlay network on top.  

If you want to connect your existing code over the internet remember to change all setting to use IPv6 network like `socket.AF_INET6` in the example above.
:::



## V. Demo no. 2 (advanced)