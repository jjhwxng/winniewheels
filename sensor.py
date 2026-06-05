import serial
import time

PORT = "/dev/ttyACM0"
BAUD = 9600

def main():
    try:
        ser = serial.Serial(PORT, BAUD, timeout=1)
        time.sleep(2)
        print(f"Listening on {PORT} at {BAUD} baud...")

        while True:
            raw = ser.readline().decode("utf-8", errors="ignore").strip()
            if not raw:
                continue

            print("Received:", raw)

            if raw.startswith("DIST:"):
                value_str = raw.split("DIST:")[1]

                try:
                    distance = float(value_str)

                    if distance < 0:
                        print("No valid ultrasonic reading")
                    elif distance < 10:
                        print("Very close object detected")
                    elif distance < 30:
                        print("Object nearby")
                    else:
                        print("Path looks clear")

                except ValueError:
                    print("Could not parse distance value")

    except serial.SerialException as e:
        print("Serial error:", e)
        print("Check the port name and whether the Arduino is connected.")
    except KeyboardInterrupt:
        print("\nStopped by user.")

if __name__ == "__main__":
    main()
