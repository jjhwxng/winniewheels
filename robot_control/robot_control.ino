
// Motor controller pins
int enA = 9;
int in1 = 8;
int in2 = 7;

int enB = 3;
int in3 = 5;
int in4 = 4;

// Ultrasonic pins
// Both sensors face forward
// Left-front sensor
// echo = 12, trig = 13
// Right-front sensor
// echo = 2, trig = 6
const int leftTrigPin = 13;
const int leftEchoPin = 12;

const int rightTrigPin = 6;
const int rightEchoPin = 2;

// Settings
int forwardSpeed = 100;
int turnSpeed = 155;

float safeDistance = 30.0;
float maxValidDist = 200.0;

// If the two readings are very close, don't overreact
float differenceThreshold = 4.0;

int rightTurnTime = 650;
int leftTurnTime = 650;
int settleTime = 200;

void setup() {
  Serial.begin(9600);

  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  pinMode(leftTrigPin, OUTPUT);
  pinMode(leftEchoPin, INPUT);

  pinMode(rightTrigPin, OUTPUT);
  pinMode(rightEchoPin, INPUT);

  digitalWrite(leftTrigPin, LOW);
  digitalWrite(rightTrigPin, LOW);

  stopMotors();
}

void loop() {
  float leftDistance = getStableDistance(leftTrigPin, leftEchoPin);
  float rightDistance = getStableDistance(rightTrigPin, rightEchoPin);

  Serial.print("LEFT_FRONT: ");
  Serial.print(leftDistance);
  Serial.print(" | RIGHT_FRONT: ");
  Serial.println(rightDistance);

  bool leftValid = isValidDistance(leftDistance);
  bool rightValid = isValidDistance(rightDistance);

  // If both fail, just stop briefly and try again
  if (!leftValid && !rightValid) {
    stopMotors();
    delay(settleTime);
    return;
  }

  // Compute "front clearance" conservatively:
  // if either front sensor sees something too close, treat front as blocked
  bool frontBlocked = false;

  if (leftValid && leftDistance <= safeDistance) frontBlocked = true;
  if (rightValid && rightDistance <= safeDistance) frontBlocked = true;

  // If front is clear, keep moving
  if (!frontBlocked) {
    moveForward(forwardSpeed);
    delay(60);
    return;
  }

  // Front blocked -> stop first
  stopMotors();
  delay(settleTime);

  // Turning logic for FRONT-FACING sensors:
  // turn away from the closer obstacle
  if (leftValid && !rightValid) {
    // Only left sees obstacle -> obstacle is more on left-front
    // turn right
    turnRightInPlace();
  }
  else if (!leftValid && rightValid) {
    // Only right sees obstacle -> obstacle is more on right-front
    // turn left
    turnLeftInPlace();
  }
  else {
    // Both valid
    float diff = leftDistance - rightDistance;

    Serial.print("DIFF (LEFT - RIGHT): ");
    Serial.println(diff);

    if (abs(diff) <= differenceThreshold) {
      // Pretty similar -> default direction
      turnRightInPlace();
    }
    else if (leftDistance > rightDistance) {
      // More room on left-front, obstacle is closer on right-front
      turnLeftInPlace();
    }
    else {
      // More room on right-front, obstacle is closer on left-front
      turnRightInPlace();
    }
  }

  delay(settleTime);
}

float getDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH, 30000);

  if (duration == 0) return -1;

  float distance = duration * 0.0343 / 2.0;

  if (distance > maxValidDist) return -1;
  return distance;
}

float getStableDistance(int trigPin, int echoPin) {
  float d1 = getDistance(trigPin, echoPin);
  delay(10);
  float d2 = getDistance(trigPin, echoPin);
  delay(10);
  float d3 = getDistance(trigPin, echoPin);

  if (isValidDistance(d3)) return d3;
  if (isValidDistance(d2)) return d2;
  if (isValidDistance(d1)) return d1;
  return -1;
}

bool isValidDistance(float d) {
  return d >= 0 && d <= maxValidDist;
}

void moveForward(int speedVal) {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  analogWrite(enA, speedVal);
  analogWrite(enB, speedVal);
}

void turnRightInPlace() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);

  analogWrite(enA, turnSpeed);
  analogWrite(enB, turnSpeed);

  delay(rightTurnTime);
  stopMotors();
}

void turnLeftInPlace() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);

  analogWrite(enA, turnSpeed);
  analogWrite(enB, turnSpeed);

  delay(leftTurnTime);
  stopMotors();
}

void stopMotors() {
  analogWrite(enA, 0);
  analogWrite(enB, 0);

  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}
