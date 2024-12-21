import TopBox from "../../components/topBox/TopBox";
import ChartBox from "../../components/chartBox/ChartBox";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import "./home.scss";
import { detectionData } from "../../data/detectionData";
import { sectionData } from "../../data/sectionData";
import { isleChart } from "../../data/isleChart";
import { diverseData } from "../../data/diverseData";
import { pickedData } from "../../data/pickedData";
import { overviewData } from "../../data/overviewData";
import { dailyTime } from "../../data/dailyTime";
import { totalTime } from "../../data/totalTime";


const Home = () => {
    return (
        <div className="home">
            <div className="box box1">
                <TopBox/>
            </div>
            <div className="box box2"><ChartBox {...detectionData}/></div>
            <div className="box box3"><ChartBox {...sectionData}/></div>
            <div className="box box4"><PieChartBox { ...isleChart }/></div>
            <div className="box box5"><ChartBox { ...diverseData }/></div>
            <div className="box box6"><ChartBox { ...pickedData }/></div>
            <div className="box box7"><BigChartBox { ...overviewData }/></div>
            <div className="box box8"><BarChartBox { ...dailyTime } /></div>
            <div className="box box9"><BarChartBox { ...totalTime } /></div>
        </div>
    )
}

export default Home