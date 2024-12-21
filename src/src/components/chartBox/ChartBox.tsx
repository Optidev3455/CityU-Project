import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import "./chartbox.scss";


type Data = {
    color       : string;
    icon        : string;
    title       : string;
    number      : number | string;
    percentage  : number;
    url         : string;
    time        : string;
    chartData   : { 
        name    : string, 
        amount  : number 
    }[];
}


const ChartBox = (data: Data) => {
    return (
        <div className="chartBox">
            <div className="boxInfo">
                <div className="title">
                    <img src={data.icon} alt="" />
                    <span>{data.title}</span>
                </div>
                <h1>{data.number}</h1>
                <Link to={"/Chart#" + data.url}>View all</Link>
            </div>
            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={data.chartData}>
                            <Tooltip contentStyle={{ borderRadius: '5px', backgroundColor: 'transparent' }} />
                            <XAxis dataKey={"name"} tick={{ fill: 'transparent' }} tickLine={{ stroke: 'transparent' }} stroke="transparent" />
                            <Line type="monotone" dataKey="amount" stroke={data.color} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <div className="percentage" style={{ color: data.percentage >= 0 ? "limegreen" : "tomato" }}>{data.percentage >= 0 ? '+' : ''}{data.percentage}%</div>
                    <div className="time">{data.time}</div>
                </div>
            </div>
        </div>
    );
};
export default ChartBox