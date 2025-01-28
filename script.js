const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const digitalClock = document.getElementById('digital-clock');
const alarmHour = document.getElementById('alarm-hour');
const alarmMinute = document.getElementById('alarm-minute');
const setAlarmButton = document.getElementById('set-alarm-button');
const alarmAudio = document.getElementById('alarm-audio');

let alarmTime = null;
let alarmActive = false;
let alarmPlaying = false;

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
  if (!alarmActive && !alarmPlaying) {
    const selectedHour = alarmHour.value;
    const selectedMinute = alarmMinute.value;

    if (selectedHour && selectedMinute) {
      alarmTime = `${selectedHour}:${selectedMinute}:00`;
      alarmActive = true;
      alert(`Alarm set for ${selectedHour}:${selectedMinute}`);
      setAlarmButton.textContent = 'Stop Alarm';
      setAlarmButton.classList.add('stop-alarm');
    } else {
      alert('Please select both hour and minute.');
    }
  } else {
    alarmTime = null;
    alarmActive = false;
    alert(`Your alarm at time ${alarmHour.value}:${alarmMinute.value} is cancelled.`);
    setAlarmButton.textContent = 'Set Alarm';
    setAlarmButton.classList.remove('stop-alarm');
    if (alarmPlaying) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmPlaying = false;
    }
  }
});

alarmAudio.addEventListener('ended', () => {
  alarmPlaying = false;
  setAlarmButton.textContent = 'Set Alarm';
  setAlarmButton.classList.remove('stop-alarm');
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

  if (alarmTime === `${formattedHours}:${formattedMinutes}:00` && alarmActive) {
    alarmAudio.play();
    alarmPlaying = true;
    alarmActive = false;
  }
}

setInterval(updateClock, 1000);
updateClock();
