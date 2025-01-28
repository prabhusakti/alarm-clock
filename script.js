const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const digitalClock = document.getElementById('digital-clock');
const alarmHour = document.getElementById('alarm-hour');
const alarmMinute = document.getElementById('alarm-minute');
const setAlarmButton = document.getElementById('set-alarm-button');
const alarmAudio = document.getElementById('alarm-audio');

let alarmTime = null;

// Populate dropdowns
for (let i = 0; i < 24; i++) {
  const option = document.createElement('option');
  option.value = i.toString().padStart(2, '0');
  option.textContent = i.toString().padStart(2, '0');
  alarmHour.appendChild(option);
}

for (let i = 0; i < 60; i++) {
  const option = document.createElement('option');
  option.value = i.toString().padStart(2, '0');
  option.textContent = i.toString().padStart(2, '0');
  alarmMinute.appendChild(option);
}

setAlarmButton.addEventListener('click', () => {
  const selectedHour = alarmHour.value;
  const selectedMinute = alarmMinute.value;

  if (selectedHour && selectedMinute) {
    alarmTime = `${selectedHour}:${selectedMinute}:00`;
    alert(`Alarm set for ${selectedHour}:${selectedMinute}:00`);
    alarmAudio.play(); // To allow interaction-based audio play
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  } else {
    alert('Please select both hour and minute.');
  }
});

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDegree = (seconds / 60) * 360;
  const minuteDegree = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegree = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  secondHand.style.transform = `translate(-50%, -100%) rotate(${secondDegree}deg)`;
  minuteHand.style.transform = `translate(-50%, -100%) rotate(${minuteDegree}deg)`;
  hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDegree}deg)`;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  digitalClock.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  if (alarmTime === `${formattedHours}:${formattedMinutes}:00`) {
    alarmAudio.play();
  }
}

setInterval(updateClock, 1000);
updateClock();