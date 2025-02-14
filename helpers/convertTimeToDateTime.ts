export default function convertTimeToDateTime(date: Date, time: string) {
    // convert date to 'YYYY-MM-DD'
    const currentDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    // extract time details
    const [timeHours, timeMinutesWithPeriod] = time.split(':')
    const [minutes, period] = timeMinutesWithPeriod.split(' ')

    // convert hours to 24-hour representation
    let hours = parseInt(timeHours)
    if (hours < 12 && period === "PM") {
        hours += 12
    }
    if (period === 'AM' && hours === 12) {
        hours = 0
    }

    const dateTime = `${currentDate}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`
    return dateTime
}