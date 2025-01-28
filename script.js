const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const digitalClock = document.getElementById('digital-clock');
const alarmInput = document.getElementById('alarm-time');
const alarmAudio = document.getElementById('alarm-audio');
const setAlarmButton = document.getElementById('set-alarm-button');

let alarmTime = null;

setAlarmButton.addEventListener('click', () => {
  alarmTime = alarmInput.value;
  alert(`Alarm set for ${alarmTime}`);
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

  if (alarmTime === `${formattedHours}:${formattedMinutes}:${formattedSeconds}`) {
    alarmAudio.play();
  }
}

setInterval(updateClock, 1000);
updateClock();
