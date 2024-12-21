import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"
import './pieChartBox.scss';

type Data = {
    chartData: { 
        name    : string,
        value   : number, 
        color   : string 
    }[];
}

const PieChartBox = (pieData: Data) => {
    return (
        <div className="pieChartBox">
            <h1>Monthly Isle visits</h1>
            <div className="chart">
                <ResponsiveContainer width='99%' height={400}>
                    <PieChart>
                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '5px'}} />
                        <Pie 
                            data={pieData.chartData} 
                            innerRadius={'70%'} 
                            outerRadius={'90%'} 
                            paddingAngle={5} 
                            dataKey={'value'}
                        >
                            {pieData.chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options">
                {pieData.chartData.map((entry) => (
                    <div className="option" key={entry.name}>
                        <div className="title">
                            <div className="dot" style={{ backgroundColor: entry.color }} />
                            <span>{entry.name}</span>
                        </div>
                            <span>{entry.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartBox