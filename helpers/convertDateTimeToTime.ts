export default function convertDateTimeToTime(date: string) {
    const time = date.split('T')[1]
    // isolate hours
    const [hours, minutesSeconds] = time.split(':')
    // isolate minutes
    const minutes = minutesSeconds.split(':')[0]

    let timeStringHours = parseInt(hours)
    let timeStringMinutes = parseInt(minutes)
    let period = timeStringHours <= 11 ? 'AM' : 'PM'

    if (timeStringHours === 0) {
        timeStringHours = 12
    } else if (timeStringHours > 12) {
        timeStringHours -= 12
    }

    const timeString = `${timeStringHours.toString().padStart(2, '0')}:${timeStringMinutes.toString().padStart(2, '0')} ${period}`
    return timeString
}