/**
 * Instructions:
 * 
 * Update this code with the total sum of detections made in a month
 * This requires calculation of multiple data.
 */

export const totalTime = {
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

    title: "Monthly Human Flow",
    color: "magenta",
    dataKey: 'detection',
    total: 39569,
    chartData: [
        { name: "12 am - 4am",  detection: 51        },
        { name: "4 am - 8 am",  detection: 6513      },
        { name: "8 am - 12 nn", detection: 11651    },
        { name: "12 nn - 4 pm", detection: 6449     },
        { name: "4 pm - 8 am",  detection: 6161      },
        { name: "8 pm - 12 am", detection: 8771     }
    ]
}