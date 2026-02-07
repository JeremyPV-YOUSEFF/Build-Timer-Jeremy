let interval;
let day;
let hour;
let minute;
let second;

const validSecond = localStorage.getItem('second')
const validMinute = localStorage.getItem('minute')
const validHour = localStorage.getItem('hour')
const validDay = localStorage.getItem('day')

if ( validSecond !== null ) {
    second = localStorage.getItem('second')
    document.getElementById('second').textContent = second
}

if (validMinute !== null) {
    minute = localStorage.getItem('minute')
    document.getElementById('minute').textContent = minute
}
if (validHour !== null) {
    hour = localStorage.getItem('hour')
    document.getElementById('hour').textContent = hour
}
if (validDay !== null) {
    day = localStorage.getItem('day')
    document.getElementById('day').textContent = day
}


if (validSecond !== null && validMinute !== null && validHour !== null &&validDay !== null) {
    document.getElementById('openForm').classList.add('hidden');
    document.getElementById('actions').classList.remove('hidden');

    counter(second,minute,hour,day)

    console.log('papa')
}else{
    console.log(validSecond,'second',second)
    console.log(validMinute,'minute',minute)
    console.log(validHour,'hour',hour)
    console.log(validDay,'day',day)
}

document.getElementById('openForm').addEventListener('click',(x) => {
    document.querySelector('div').classList.toggle('opacity-40')
    document.getElementById('dialog').classList.remove('hidden')
})

document.getElementById('closeDialog').addEventListener('click', () => {
    document.getElementById('dialog').classList.add('hidden');
    document.querySelector('div').classList.remove('opacity-40');
    document.getElementById('message').textContent = ""
    document.getElementById('message').classList.add('hidden')
})

document.getElementById('close').addEventListener('click', () => {
    document.getElementById('dialog').classList.add('hidden');
    document.querySelector('div').classList.remove('opacity-40');
    document.getElementById('message').textContent = ""
    document.getElementById('message').classList.add('hidden')
})



document.getElementById('confirm').addEventListener('click', () => {
    const date = new Date();

    const dateForm = new Date(document.getElementById('date').value);

    if (dateForm == "Invalid Date") {
        const message = document.getElementById('message')
        message.textContent = "Choose a later date"
        message.classList.remove('hidden')
        return;
    }

    let diffDate = dateForm -  date;

    if (diffDate<0) {
        const message = document.getElementById('message')
        message.textContent = "Choose a later date"
        message.classList.remove('hidden')
        return;
    }

    document.getElementById('openForm').classList.add('hidden');
    document.getElementById('actions').classList.remove('hidden');

    const day = Math.floor(diffDate/86400000);
    diffDate%=86400000;
    const hour = Math.floor(diffDate/3600000);
    diffDate%=3600000;
    const minute = Math.floor(diffDate/60000);
    diffDate%=60000;
    const second = Math.floor(diffDate/1000);

    document.getElementById('day').textContent = day;
    document.getElementById('hour').textContent = hour;
    document.getElementById('minute').textContent = minute;
    document.getElementById('second').textContent = second;

    document.getElementById('dialog').classList.add('hidden');
    document.querySelector('div').classList.remove('opacity-40');

    counter(second,minute,hour,day)
})



function counter(second1,minute2,hour3,day4){
    day = day4;
    hour = hour3;
    minute = minute2;
    second = second1;


    interval = setInterval(() => {
        upload(second,minute,hour,day)
        if (second>0) {
            second--;
            document.getElementById('second').textContent = second;
            return;
        }else{
            if (minute>0) {
                minute--;
                second=59;
                document.getElementById('second').textContent = second;
                document.getElementById('minute').textContent = minute;
            }else{
                if (hour>0) {
                    hour--;
                    minute=59;
                    document.getElementById('minute').textContent = minute;
                    document.getElementById('hour').textContent = hour;
                    second = 59;
                    document.getElementById('second').textContent = second;
                }else{
                    if (day>0) {
                        day--;
                        hour=23;
                        document.getElementById('hour').textContent = hour;
                        document.getElementById('day').textContent = day;
                        minute=59;
                        document.getElementById('minute').textContent = minute;
                        second = 59;
                        document.getElementById('second').textContent = second;
                    }
                }
            }
        }

        if (second == minute == hour == day) {
            const audio = document.querySelector("audio")
            audio.muted = false;    

            document.getElementById('openForm').classList.remove('hidden');
            document.getElementById('actions').classList.add('hidden');

            audio.play();
            const playMusic = setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                clearTimeout(playMusic)
            }, 5000);
            clearInterval(interval);
        }
    }, 1000);
}

document.getElementById('removeCounter').addEventListener('click', (x) => {
    clearInterval(interval);
    document.getElementById('day').textContent = '00';
    document.getElementById('hour').textContent = '00';
    document.getElementById('minute').textContent = '00';
    document.getElementById('second').textContent = '00';

    document.getElementById('openForm').classList.remove('hidden');
    document.getElementById('actions').classList.add('hidden');

    localStorage.removeItem('second');
    localStorage.removeItem('minute');
    localStorage.removeItem('hour');
    localStorage.removeItem('day');

})


document.getElementById('pauseCounter').addEventListener('click', (x) => {
    clearInterval(interval);
    document.getElementById('pauseCounter').classList.add('hidden');
    document.getElementById('playCounter').classList.remove('hidden');
})

document.getElementById('playCounter').addEventListener('click', (x) => {
    counter(second,minute,hour,day);
    document.getElementById('pauseCounter').classList.remove('hidden');
    document.getElementById('playCounter').classList.add('hidden');
})

/* Keep in localstorage */

function upload(second,minute,hour,day){
    localStorage.setItem('second',second)
    localStorage.setItem('minute',minute)
    localStorage.setItem('hour',hour)
    localStorage.setItem('day',day)
}