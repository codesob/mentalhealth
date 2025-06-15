import React, { useState } from 'react';

const TherapySession = () => {
    const [sessionDetails, setSessionDetails] = useState({
        date: '',
        time: '',
        duration: '',
        therapist: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSessionDetails({
            ...sessionDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to book or join a therapy session
        console.log('Session details submitted:', sessionDetails);
    };

    return (
        <div className="therapy-session">
            <h2>Book a Therapy Session</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={sessionDetails.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Time:</label>
                    <input type="time" name="time" value={sessionDetails.time} onChange={handleChange} required />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input type="number" name="duration" value={sessionDetails.duration} onChange={handleChange} required />
                </div>
                <div>
                    <label>Therapist:</label>
                    <input type="text" name="therapist" value={sessionDetails.therapist} onChange={handleChange} required />
                </div>
                <button type="submit">Schedule Session</button>
            </form>
        </div>
    );
};

export default TherapySession;