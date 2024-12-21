/**
 * Instructions:
 * 
 * Update this code with the total sum of detections made in a month
 * This requires calculation of multiple data.
 */

export const isleChart = {
    /**
     * Args:
     * 
     * > chartData  : object    // Contains 3 values:
     *                                              > name  :   string  // Contains the name of an isle
     *                                              > value :   number  // Contains the sum of detections made by the camera
     *                                              > color :   string  // Contains a Hex color code
     */
    chartData: [
        { name: 'Electronics',          value: 549, color: '#00f0ff' }, //21.3%
        { name: 'Groceries',            value: 956, color: '#50c878' }, //37.1%
        { name: 'Household Supplies',   value: 654, color: '#fdbe02' }, //25.4%
        { name: 'Pet Supplies',         value: 321, color: '#967969' }, //12.4%
        { name: 'Baby Products',        value: 94,  color: '#ccccff' }  //3.7%
    ]
}