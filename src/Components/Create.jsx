import { useState } from 'react';
import rand from '../Functions/rand';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = ({ addScooter }) => {
    const [lastUseTime, setLastUseTime] = useState('');
    const [totalRideKilometres, setTotalRideKilometres] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!lastUseTime || !totalRideKilometres) {
            toast.error('Visi laukeliai turi būti užpildyti!');
            return;
        }

        const selectedDate = new Date(lastUseTime);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            toast.error('Paskutinio naudojimo data negali būti ateityje!');
            return;
        }

        if (isNaN(totalRideKilometres)) {
            toast.error('Prašome įvesti tinkamą ridą!');
            return;
        }

        const rideKilometres = parseFloat(totalRideKilometres);

        if (rideKilometres < 0) {
            toast.error('Rida negali būti neigiama!');
            return;
        }

        const newScooter = {
            id: Date.now(),
            registrationCode: rand(10000000, 99999999).toString(),
            isBusy: 0,
            lastUseTime: lastUseTime,
            totalRideKilometres: rideKilometres,
        };

        addScooter(newScooter);
        toast.success('Paspirtukas sėkmingai pridėtas!');

        setLastUseTime('');
        setTotalRideKilometres('');
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3">
            <h2 className="card-title">Pridėti naują paspirtuką</h2>
            <div className="mb-3">
                <label className="form-label">Paskutinis naudojimas:</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={lastUseTime}
                    onChange={e => setLastUseTime(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Rida (km):</label>
                <input
                    type="number"
                    className="form-control"
                    value={totalRideKilometres}
                    onChange={e => setTotalRideKilometres(e.target.value)}
                    step="0.01"
                />
            </div>
            <button type="submit" className="btn green">Pridėti</button>
        </form>
    );
};

export default Create;