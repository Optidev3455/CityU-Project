/**
 * Instructions:
 * 
 * Paste the code into converters along side with json data
 * When done converting, paste them back in, overriding the previous data.
 */

/**
 * Args:
 * 
 * > color          : string          // Contains a Hex color code
 * > icon           : string          // Contains the path to the icon
 * > time           : string          // Contains the time of comparison
 * > lastNumber     : number          // Contains the number for the last record
 * > number         : number | string // Contains the current record
 * > percemtage     : number          // Calculates the % change of the current and last record
 * > chartData      : object          // Contains 2 values:
 *                                                      > name      : string  // Contains the current day of the week
 *                                                      > amount    : number  // Contains the unique sum of isles visited
 */

export const pickedData = {
    color: "#61dafb",
    icon: "/chart.svg",
    title: "Picked Up Products",
    url: 'cu',
    time: "this week",
    lastTotal: 109,
    total: 84, // Updated total count
    percentage: Math.round((84 - 109) / 109 * 100), // Updated percentage calculation
    number: Math.round(84 / 24) + ' /h', // Updated hourly rate calculation
    chartData: [
        { name: 'Sun', amount: 13 },
        { name: 'Mon', amount: 14 },
        { name: 'Tue', amount: 15 },
        { name: 'Wed', amount: 1 },
        { name: 'Thu', amount: 14 },
        { name: 'Fri', amount: 14 },
        { name: 'Sat', amount: 13 }
   ]
}