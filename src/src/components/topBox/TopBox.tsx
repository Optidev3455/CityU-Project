import "./topbox.scss";
import { topProducts } from "../../data/topProducts";

const TopBox = () => {
    return (
        <div className="topBox">
            <h1>Top 5 Attractions</h1>
            <div className="list">
                {topProducts.map(prod => (
                    <div className="listItem" key={prod.id}>
                        <div className="name">
                            <img src={prod.img} alt="" />
                            <div className="userTexts">
                                <span className="name">{prod.name}</span>
                                <span className="brand">From: {prod.brand}</span>
                                <span className="isle">Section: {prod.isle}</span>
                            </div>
                        </div>
                        <span className="amount">Looked: {prod.time}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox