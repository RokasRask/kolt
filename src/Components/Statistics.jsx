const Statistics = ({ scooters }) => {
    const totalScooters = scooters.length;
    const totalKilometres = scooters.reduce((sum, scooter) => sum + scooter.totalRideKilometres, 0);

    return (
        <div className="card p-3 mb-4">
            <h2 className="card-title">Statistika</h2>
            <p>Paspirtukų kiekis: {totalScooters}</p>
            <p>Bendra rida: {totalKilometres.toFixed(2)} km</p>
        </div>
    );
};

export default Statistics;