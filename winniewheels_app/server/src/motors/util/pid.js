export default class PID {
  constructor(kp, ki, kd) {
    this.kp = kp; this.ki = ki; this.kd = kd;
    this.prevError = 0; this.integral = 0;
  }
  compute(target, actual) {
    const error = target - actual;
    this.integral += error;
    const derivative = error - this.prevError;
    this.prevError = error;
    return this.kp * error + this.ki * this.integral + this.kd * derivative;
  }
}