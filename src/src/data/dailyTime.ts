/**
 * Instructions:
 * 
 * Paste the code into converters along side with json data
 * When done converting, paste them back in, overriding the previous data.
 */

/**
 * Args:
 * 
 * > title      : string      // Contains the title
 * > color      : string      // Contains a Hex color code
 * > dataKey    : string      // Contains a key value for chartData
 * > total      : number      // Contains the sum of detections in chartData
 * > chartData  : object      // Conains 2 values: 
 *                                              > name      : string  // Contains the time of the day
 *                                              > detection : number  // Contains the sum of detections made by the camera
 */

export const dailyTime = {

    title: "Daily Human Flow",
    color: "#b2ffff",
    dataKey: 'detection',
    total: 2,
    chartData: [
        { name: "12 am - 4am",  detection: 0        },
        { name: "4 am - 8 am",  detection: 0      },
        { name: "8 am - 12 nn", detection: 0    },
        { name: "12 nn - 4 pm", detection: 0     },
        { name: "4 pm - 8 am",  detection: 0      },
        { name: "8 pm - 12 am", detection: 2     }
    ]
}