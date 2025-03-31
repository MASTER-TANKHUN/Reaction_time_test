# F8 for enable/disable bot
# install library in terminal
# pip install pyautogui keyboard
# pip install pyscreeze
# pip install pillow

import pyautogui
import keyboard
import time

running = False

def toggle_running():
    global running
    running = not running
    print("Running:" if running else "Stopped")

keyboard.add_hotkey("F8", toggle_running) #u can change the key to any key u want

def is_yellow(color): #u can change the color to any color u want
    r, g, b = color
    return r > 200 and g > 200 and b < 100

while True:
    if running:
        screenshot = pyautogui.screenshot()
        width, height = screenshot.size

        center_x, center_y = width // 2, height // 2

        color = screenshot.getpixel((center_x, center_y))
        if is_yellow(color):

            pyautogui.click(center_x, center_y, button='left')
            time.sleep(0.1)
            
            pyautogui.scroll(100)

    time.sleep(0.05)