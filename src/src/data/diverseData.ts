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

export const diverseData = {
    color: "salmon",
    icon: "/chart.svg",
    title: "Isle Diversity",
    url: 'id',
    time: "this week",
    percentage: Math.round((24 - 10) / 10 * 100), // Updated percentage calculation
    lastNumber: 10,
    number: 24, // Total sum of updated chartData amounts
    chartData: [
        { name: 'Sun', amount: 3 },
        { name: 'Mon', amount: 4 },
        { name: 'Tue', amount: 5 },
        { name: 'Wed', amount: 1 },
        { name: 'Thu', amount: 4 },
        { name: 'Fri', amount: 4 },
        { name: 'Sat', amount: 3 }
    ]
 }