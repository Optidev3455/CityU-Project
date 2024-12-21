import { Bar, BarChart, Label, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./barChartBox.scss"

type Data = {
    title:      string;
    color:      string;
    dataKey:    string;
    total:      number;
    chartData:  {
        name        : string,
        detection   : number,
    }[];
}

const BarChartBox = (data: Data) => {
    return (
        <div className="barChartBox">
            <h1>{data.title}</h1>
            <div className="chart">
                <ResponsiveContainer width='99%' height={150}>
                    <BarChart width={150} height={40} data={data.chartData}>
                        <Tooltip contentStyle={{background: '#2a3447', borderRadius: '5px'}}/>
                        <XAxis dataKey={"name"} tick={{fill: 'transparent'}} tickLine={{stroke: 'transparent'}} stroke="#fff">
                            <Label value="Time (Hover to see)" offset={-23} position="bottom" fill="#fff" style={{ textAnchor: 'middle' }}/>
                        </XAxis>
                        <YAxis stroke="#fff">
                            <Label value="Detections" angle={-90} offset={1} position={'insideLeft'} fill="#fff" style={{ textAnchor: 'middle' }}/>
                        </YAxis>
                        <Bar dataKey={data.dataKey} fill={data.color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="text">
                <div className="amount">Total: {data.total}</div>
            </div>
        </div>
    )
}

export default BarChartBox