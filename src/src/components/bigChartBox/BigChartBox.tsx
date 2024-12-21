import './bigChartBox.scss';
import { AreaChart, ResponsiveContainer, Area, Tooltip, XAxis, YAxis, Label } from "recharts"

type Data = {
    chartData: {
        name                : string; 
        electronics         : number; 
        groceries           : number; 
        householdSupplies   : number; 
        petSupplies         : number; 
        babyProducts        : number;
    }[];
}

const BigChartBox = (chart: Data) => {
    return (
        <div className="bigChartBox">
            <h1>Detection Analytics</h1>
            <div className="chart">
                <ResponsiveContainer width='99%' height='100%'>
                    <AreaChart
                        data={chart.chartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0
                        }}
                    >
                        <defs>
                            <linearGradient id="colorElectronics" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorGroceries" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#50c878" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#50c878" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorHouseholdSupplies" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fdbe02" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#fdbe02" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPetSupplies" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#967969" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#967969" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorBabyProducts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ccccff" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ccccff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey={'name'} stroke='#fff' />
                        <YAxis stroke='#fff'>
                            <Label value="Detections" angle={-90} offset={7} position={'insideLeft'} fill="#fff" style={{ textAnchor: 'middle' }}/>
                        </YAxis>
                        <Tooltip contentStyle={{backgroundColor: '#2a3447', borderRadius: '5px'}}/>
                        <Area
                            type='monotone'
                            dataKey='electronics'
                            stroke='#00f0ff'
                            fill='url(#colorElectronics)'
                        />
                        <Area
                            type='monotone'
                            dataKey='groceries'
                            stroke='#50c878'
                            fill='url(#colorGroceries)'
                        />
                        <Area
                            type='monotone'
                            dataKey='householdSupplies'
                            stroke='#fdbe02'
                            fill='url(#colorHouseholdSupplies)'
                        />
                        <Area
                            type='monotone'
                            dataKey='petSupplies'
                            stroke='#967969'
                            fill='url(#colorPetSupplies)'
                        />
                        <Area
                            type='monotone'
                            dataKey='babyProducts'
                            stroke='#ccccff'
                            fill='url(#colorBabyProducts)'
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BigChartBox