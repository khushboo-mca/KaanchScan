import '../styles/StateCard.css';
function StateCard({ icon, title, value }) {
    return (
        <div className="state-card">
            <div className="card-img">
                <img src={icon} alt="icon" />
            </div>
            <h1>{title}</h1>
            <h2>{value}</h2>
        </div>
    );
}

export default StateCard;
