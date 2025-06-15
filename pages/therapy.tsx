import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Therapy.module.css';

interface Therapist {
    id: string;
    name: string;
    avatar: string;
    specialty: string;
    experience: string;
    rating: number;
    reviews: number;
    price: number;
    tags: string[];
    availability: string[];
    nextAvailable: string;
}

const mockTherapists: Therapist[] = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        avatar: '/therapists/sarah.jpg',
        specialty: 'Anxiety & Depression Specialist',
        experience: '15 years experience',
        rating: 4.9,
        reviews: 128,
        price: 120,
        tags: ['Anxiety', 'Depression', 'Stress Management', 'CBT'],
        availability: ['Mon', 'Wed', 'Fri'],
        nextAvailable: 'Tomorrow at 2:00 PM'
    },
    {
        id: '2',
        name: 'Dr. Michael Williams',
        avatar: '/therapists/michael.jpg',
        specialty: 'Relationship Counselor',
        experience: '12 years experience',
        rating: 4.8,
        reviews: 96,
        price: 110,
        tags: ['Relationships', 'Couples Therapy', 'Family Counseling'],
        availability: ['Tue', 'Thu', 'Sat'],
        nextAvailable: 'Today at 5:00 PM'
    },
    // Add more mock therapists
];

const TherapyPage: React.FC = () => {
    const [therapists, setTherapists] = useState<Therapist[]>(mockTherapists);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
    const [selectedPrice, setSelectedPrice] = useState<string>('all');
    const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
    const router = useRouter();

    const handleFilter = () => {
        let filtered = [...mockTherapists];

        if (selectedSpecialty !== 'all') {
            filtered = filtered.filter(t => t.tags.includes(selectedSpecialty));
        }

        if (selectedPrice !== 'all') {
            const [min, max] = selectedPrice.split('-').map(Number);
            filtered = filtered.filter(t => t.price >= min && (!max || t.price <= max));
        }

        if (selectedAvailability !== 'all') {
            filtered = filtered.filter(t => t.availability.includes(selectedAvailability));
        }

        setTherapists(filtered);
    };

    useEffect(() => {
        handleFilter();
    }, [selectedSpecialty, selectedPrice, selectedAvailability]);

    return (
        <div className={styles.therapyContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Find Your Therapist</h1>
                <p className={styles.subtitle}>
                    Connect with licensed therapists who can help you navigate life's challenges.
                    Book your session today and start your journey to better mental health.
                </p>
            </div>

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Specialty</label>
                    <select
                        className={styles.filterSelect}
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                        <option value="all">All Specialties</option>
                        <option value="Anxiety">Anxiety</option>
                        <option value="Depression">Depression</option>
                        <option value="Relationships">Relationships</option>
                        <option value="Stress Management">Stress Management</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Price Range</label>
                    <select
                        className={styles.filterSelect}
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                        <option value="all">Any Price</option>
                        <option value="0-100">Under $100</option>
                        <option value="100-150">$100 - $150</option>
                        <option value="150-200">$150 - $200</option>
                        <option value="200-">$200+</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Availability</label>
                    <select
                        className={styles.filterSelect}
                        value={selectedAvailability}
                        onChange={(e) => setSelectedAvailability(e.target.value)}
                    >
                        <option value="all">Any Day</option>
                        <option value="Mon">Monday</option>
                        <option value="Tue">Tuesday</option>
                        <option value="Wed">Wednesday</option>
                        <option value="Thu">Thursday</option>
                        <option value="Fri">Friday</option>
                        <option value="Sat">Saturday</option>
                    </select>
                </div>
            </div>

            <div className={styles.grid}>
                {therapists.map((therapist) => (
                    <div key={therapist.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <Image
                                src={therapist.avatar}
                                alt={therapist.name}
                                width={64}
                                height={64}
                                className={styles.therapistAvatar}
                            />
                            <div className={styles.therapistInfo}>
                                <h3 className={styles.therapistName}>{therapist.name}</h3>
                                <p className={styles.therapistSpecialty}>{therapist.specialty}</p>
                                <p className={styles.therapistDetails}>{therapist.experience}</p>
                            </div>
                        </div>

                        <div className={styles.tags}>
                            {therapist.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className={styles.rating}>
                            <span>★ {therapist.rating}</span>
                            <span>({therapist.reviews} reviews)</span>
                        </div>

                        <div className={styles.price}>${therapist.price} per session</div>
                        <div className={styles.availability}>
                            Next available: {therapist.nextAvailable}
                        </div>

                        <button
                            className={styles.bookButton}
                            onClick={() => router.push(`/therapy/book/${therapist.id}`)}
                        >
                            Book Session
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TherapyPage;