document.addEventListener("DOMContentLoaded",()=>{
    const currentDateElement = document.getElementById('currentDate');
    const currentTimeElement = document.getElementById('currentTime');
    const prevMonthButton = document.getElementById('prevMonth');
    const currentMonthElement = document.getElementById('currentMonth');
    const nextMonthButton = document.getElementById('nextMonth');
    const calendarElement = document.getElementById('calendar');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    

    function updateDateTime() {
        const now = new Date();
        currentDateElement.innerHTML = `Current Date: ${now.toLocaleDateString()}`;
        currentTimeElement.innerHTML = `Current time: ${now.toLocaleTimeString()}`;
    }
    function generateCalendar(year, month) {
        calendarElement.innerHTML = ''; // Clear previous calendar
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

        currentMonthElement.innerHTML = `${monthName} ${year}`;

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach((day) => {
            const dayElement = document.createElement('div');
            dayElement.innerHTML = day;
            dayElement.style.fontWeight = 'bold';
            calendarElement.appendChild(dayElement);
        });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarElement.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.innerHTML = i;
            const today = new Date();
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                day.classList.add('today');
            }
            calendarElement.appendChild(day);
        }
    }

    function changeMonth(offset) {
        currentMonth += offset;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    updateDateTime();
    setInterval(updateDateTime, 1000);
    generateCalendar(currentYear, currentMonth);
    


});