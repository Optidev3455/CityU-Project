import { detectionData } from "./detectionData"

/**
 * Instructions:
 * 
 * Update this code with the total sum of detections made in a day
 * This requires calculation of multiple data.
 * 
 * Can be used with dailyTimeConverter.py, only paste back the chartData
 */

export const sectionData = {
    /**
     * Args:
     * 
     * > color          : string          // Contains a Hex color code
     * > icon           : string          // Contains the path to the icon
     * > time           : string          // Contains the time of comparison
     * > lastNumber     : number          // Contains the number for the last record
     * > number         : number | string // Contains the current record
     * > url            : string          // Contains the id of the chart to redirect to
     * > percemtage     : number          // Calculates the % change of the current and last record
     * > chartData      : object          // Contains 2 values:
     *                                                      > name      : string  // Contains the current day of the week
     *                                                      > amount    : number  // Contains the unique sum of isles visited
     */

    color: "magenta",
    icon: "/chart.svg",
    title: "Human Flow",
    url: 'hf',
    percentage: Math.round(((detectionData.number - detectionData.lastNumber) / detectionData.lastNumber) * 100),
    number: Math.round((detectionData.number / 24)) + " /h",
    time: "from yesterday",
    chartData: [
        { name: "12 am - 4am",  amount: 0       },
        { name: "4 am - 8 am",  amount: 134     },
        { name: "8 am - 12 nn", amount: 1425    },
        { name: "12 nn - 4 pm", amount: 234     },
        { name: "4 pm - 8 am",  amount: 354     },
        { name: "8 pm - 12 am", amount: 4576    },
    ],
}