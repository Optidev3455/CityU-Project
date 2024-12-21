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

export const detectionData = {
    color: "#6699cc",
    icon: "/chart.svg",
    title: "Detections",
    url: 'd',
    time: "Wed this week",
    lastNumber: 1000, // Adjust as necessary
    number: 8225, // Updated total number
    percentage: Math.round((8225 - 1000) / 1000 * 100), // Updated percentage calculation
    chartData: [
        { name: 'Sun', amount: 432 },
        { name: 'Mon', amount: 134 },
        { name: 'Tue', amount: 1425 },
        { name: 'Wed', amount: 17 },
        { name: 'Thu', amount: 34 },
        { name: 'Fri', amount: 4576 },
        { name: 'Sat', amount: 1607 },
   ],
}