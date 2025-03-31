# Reaction Time Test 😱

A simple web reaction time test application built by MASTER T.

## Overview

The web test gauges reaction time by having a user click the instant the screen changes from red to yellow. It provides immediate performance feedback and several opportunities at testing.

## Lang Used

- HTML5
- CSS3
- JavaScript

## How It Works

1. **Start Screen**: The program begins with a red screen with instructions in English.
2. **Waiting Phase**: The screen is red after the user has clicked to begin and instructs the user to wait for the yellow screen.
3. **Test Phase**: After a random waiting time, the screen becomes yellow and instructs the user to click as soon as possible.
4. **Results**: Upon clicking, the screen goes black and shows the user's reaction time in milliseconds.
5. **Restart**: An additional click will restart the test.

## Features

- **Random Timing**: Each test uses a different random delay before showing the yellow screen (between 1-5 seconds).
- **False Start Detection**: If a user clicks before the yellow screen appears, they receive a warning message.
- **Immediate Color Changes**: No transition effects are used, ensuring accurate timing measurements.
- **Millisecond Precision**: Reaction times are measured with millisecond accuracy.

## Installation

```
git clone https://github.com/MASTER-TANKHUN/Reaction_time_test
cd Reaction_time_test
open index.html
```

## Usage

1. Open the HTML file in a web browser
2. Click to start the test
3. Wait for the screen to turn yellow
4. Click as quickly as possible when the screen turns yellow
5. View your reaction time result
6. Click again to restart the test

## Developer

Developed by MASTER T © 2025