let sensorData = {};
function update(newData) { sensorData = { ...sensorData, ...newData }; }
function get() { return sensorData; }
let sendCommand = () => {};
export default { update, get, sendCommand };